import React, { Suspense, useState, useEffect, useRef } from 'react'
import {Redirect} from 'react-router-dom'
import Layout from '../Layout'
import { isAuthenticated } from '../../models/auth/api'
import { Link } from 'react-router-dom'
import { createProduct, getCategories, getStatusValues } from '../../models/products/api'
import NumberFormat from 'react-number-format'
import {PUBLIC_URL} from '../../config'
import { addItemPicture, configCkeditor } from '../../helpers'
import CKEditor from "ckeditor4-react";

const InsertProduct = () => {
  const [values, setValues] = useState({
    productName: '',
    productName2: '',
    productSerial: '',
    description: '',
    context: '',
    context1: '',
    context2: '',
    context3: '',
    context4: '',
    context5: '',
    productPriceNew: 0,
    productPriceVirtual: 0,
    productPriceOld: 0,
    productPriceAgent: 0,
    slug: '',
    photo: '',
    pictures: '',
    category: '',
    categories: [],
    brand: [],
    productIds: [],
    productIds2: [],
    quantity: 0,
    warranty: 12,
    sold: 0,
    tag: '',
    visit: 0,
    vat: true,
    topLevel: 1,
    error: '',
    createdProduct: '',
    redirectToProductsList: false,
    formdata: ''
  })
  const {
    productName,
    productName2,
    productSerial,
    description,
    context,
    context1,
    context2,
    context3,
    context4,
    context5,
    productPriceNew,
    productPriceVirtual,
    productPriceOld,
    productPriceAgent,
    slug,
    pictures,
    category,
    categories,
    brand,
    productIds,
    productIds2,
    quantity,
    warranty,
    sold,
    tag,
    visit,
    vat,
    topLevel,
    error,
    createdProduct,
    redirectToProductsList,
    formData
  } = values
  const [statusValues, setStatusValues] = useState([])
  const inputEl = useRef(null);
  const {user, token} = isAuthenticated()
  const init = () => {
    getCategories().then(data => {
      if(data.error) {
        setValues({...values, error: data.error})
      }
      else {
        setValues({...values, categories: data, formData: new FormData()})
      }
    })
  }
  useEffect(()=> {
    init()
    loadStatusValues()
  }, [])

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    // console.log(...formData)

    setValues({...values, error: false, createdProduct: '', [name]: value})
  }
  const handleChangeChecked = name => event => {
    console.log(event.target.checked);
    const value = event.target.checked;
    formData.set(name, value);
    console.log(...formData)

    setValues({...values, error: false, createdProduct: '', [name]: value})
  }
  const handleChangeCkeditor = (name, evt) => {
    formData.set(name, evt.editor.getData());
    setValues({...values, [name]: evt.editor.getData()});
  }
  const uploadFile = name => event => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
       formData.append(`photo`, files[i])
    }
  }

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then(data => {
      if(data.error) {
        setValues({...values, error: data.error})
      }
      else {
        setStatusValues(data)
      }
    })
  }

  const showStatus = o => (
    <div className="form-group">
      <label className="font-weight-bold">Trạng thái</label>
      <select className="custom-select d-block w-100" onChange={handleChange('status2')}>
        <option>Không chọn</option>
        {statusValues.map((status, index)=> (
          <option key={index} value={status}> {status} </option>
        ))}
      </select>
    </div>
  )
  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
      {error}
    </div>
  )

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: '', loading: true})
    // createProduct(user._id, token, formData).then(data => {
    //   if(data.error) {
    //     setValues({...values, error: data.error})
    //   }
    //   else {
    //     setValues({...values,
    //       createdProduct: true,
    //       redirectToProductsList: true
    //     })
    //   }
    // }).catch(error => console.log(error))
    // console.log(formData.values());
    // inputEl.current.value;
    // console.log(inputEl.target.val());


    const fields = Array.prototype.slice.call(event.target)
      .filter(el => el.name )
      .reduce((form, el) => ({
        ...values,
        [el.name]: el.name === 'photo' ? el.files[0] : el.value, formData: formData.set(el.name, (el.name === 'photo' ? el.files[0] : el.value))
      }), {})
    console.log(...formData);
    createProduct(user._id, token, formData).then(data => {
      if(data.error) {
        setValues({...values, error: data.error})
      }
      else {
        formData.delete('photo')
        setValues({...values,
          productName: '',
          productName2: '',
          productSerial: '',
          description: '',
          context: '',
          context1: '',
          context2: '',
          context3: '',
          context4: '',
          context5: '',
          productPriceNew: 0,
          productPriceVirtual: 0,
          productPriceOld: 0,
          productPriceAgent: 0,
          slug: '',
          photo: '',
          pictures: '',
          brand: [],
          productIds: [],
          productIds2: [],
          quantity: 0,
          warranty: 12,
          sold: 0,
          tag: '',
          visit: 0,
          vat: true,
          topLevel: 1,
          error: '',
          createdProduct: '',
          redirectToProductsList: false,
          formdata: '',
          loading: false,
          createdProduct: true,
          redirectToProductsList: true,
        })
      }
    }).catch(error => console.log(error))
  }

  const shouldRedirect = redirectToProductsList => {
    if(redirectToProductsList) return <Redirect to="/admin/product/productsearch"/>
  }

  const showSuccess = () => (
      <div className="alert alert-info" style={{display: createdProduct ? '' : 'none'}}>
          {`${createdProduct}`} is created
      </div>
  )

  const formInput = () => {
    return (
      <form onSubmit={clickSubmit}>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <a className="nav-link active" data-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">Thông tin chính</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" data-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false">Hình ảnh</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" data-toggle="tab" href="#tab3" role="tab" aria-controls="tab3" aria-selected="false">Giới thiệu</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" data-toggle="tab" href="#tab4" role="tab" aria-controls="tab4" aria-selected="false">Mô tả</a>
          </li>
          <li className="nav-item" role="presentation">
            <a className="nav-link" data-toggle="tab" href="#tab5" role="tab" aria-controls="tab5" aria-selected="false">Nội dung</a>
          </li>
        </ul>
        <div className="tab-content p-3 border-left border-right border-bottom" id="TabContent">
          <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab-1">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                    <label className="font-weight-bold">Nhóm sản phẩm</label>
                    <select name="category" className="custom-select d-block w-100" onChange={handleChange('category')} required>
                        <option value="0">Không chọn</option>
                        {
                          categories && categories.map((c, i) => {
                            return <option value={c._id} key={i}>{c.name}</option>
                          })
                        }
                    </select>
                </div>
                <div className="form-group">
                  <label className="font-weight-bold">Tên sản phẩm</label>
                  <input ref={inputEl} type="text" className="form-control" name="productName" value={productName} onChange={handleChange('productName')} required/>
                </div>
                <div className="form-group">
                  <label className="font-weight-bold">Serial</label>
                  <input type="text" className="form-control" name="productSerial" value={productSerial} onChange={handleChange('productSerial')} required/>
                </div>
                {showStatus()}
                <div className="form-group">
                  <label className="font-weight-bold w-100">Tình trạng</label>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input defaultChecked onChange={handleChange('status')} type="radio" id="status1" value="on" name="status" className="custom-control-input" />
                    <label className="custom-control-label" htmlFor="status1">Còn hàng</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" onChange={handleChange('status')} id="status2" value="false" name="status" className="custom-control-input" />
                    <label className="custom-control-label" htmlFor="status2">Hết hàng</label>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label className="font-weight-bold w-100">Giá gốc</label>
                      <input value={productPriceOld} onChange={handleChange('productPriceOld')} name="productPriceOld" type="text" className="form-control" validator="number" defaultValue={0} />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label className="font-weight-bold w-100">Giá đại lý</label>
                      <input value={productPriceAgent} onChange={handleChange('productPriceAgent')} name="productPriceAgent" type="text" className="form-control" validator="number" defaultValue={0} />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label className="font-weight-bold w-100">Giá web</label>
                      <input value={productPriceNew} onChange={handleChange('productPriceNew')} name="productPriceNew" type="text" className="form-control" validator="number" defaultValue={0} />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label className="font-weight-bold w-100">Giá ảo</label>
                      <input value={productPriceVirtual} onChange={handleChange('productPriceVirtual')} name="productPriceVirtual" type="text" className="form-control" validator="number" defaultValue={0} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3">
                    <div className="form-group">
                      <label className="font-weight-bold w-100">VAT</label>
                      <input onChange={handleChangeChecked('vat')} type="checkbox" defaultChecked />
                      </div>
                  </div>
                  <div className="col-9">
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label className="font-weight-bold">Số người xem</label>
                          <input type="text" className="form-control" value={visit} name="visit" onChange={handleChange('visit')}/>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label className="font-weight-bold">Số lượng</label>
                          <input type="text" className="form-control" value={quantity} name="quantity" onChange={handleChange('quantity')}/>
                        </div>
                      </div>
                      <div className="col">
                        <label className="font-weight-bold">Vị trí</label>
                        <select defaultValue="1" className="form-control" name="topLevel" value={topLevel} onChange={handleChange('topLevel')}>
                          <option value={-1}>-1</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                          <option value={8}>8</option>
                          <option value={9}>9</option>
                          <option value={10}>10</option>
                          <option value={11}>11</option>
                          <option value={12}>12</option>
                          <option value={13}>13</option>
                          <option value={14}>14</option>
                          <option value={15}>15</option>
                          <option value={16}>16</option>
                          <option value={17}>17</option>
                          <option value={18}>18</option>
                          <option value={19}>19</option>
                          <option value={20}>20</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="font-weight-bold">Tên sản phẩm 2</label>
                  <input type="text" className="form-control" name="productName2" value={productName2} onChange={handleChange('productName2')}/>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label className="font-weight-bold">Bảo hành(tháng)</label>
                      <input type="text" className="form-control" name="warranty" value={warranty} onChange={handleChange('warranty')}/>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label className="font-weight-bold">Đã bán</label>
                      <input readOnly type="text" className="form-control" name="sold" value={sold} onChange={handleChange('sold')}/>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="font-weight-bold">Tag</label>
                  <textarea className="form-control" name="tag" onChange={handleChange('tag')} value={tag}></textarea>
                </div>
                <div className="form-group">
                  <label className="font-weight-bold">Hình ảnh</label>
                  <input type="file" onChange={uploadFile('photo')} className="form-control-file" multiple accept="image/x-png,image/gif,image/jpeg"/>
                </div>

              </div>
            </div>
          </div>
          <div className="tab-pane" id="tab2" role="tabpanel" aria-labelledby="tab-2">

            <div className="row">
              <div className="col-md-4">
                <img className="m-1" src={`${PUBLIC_URL}/images/no-photo.jpg`} style={{maxHeight: '100px', maxWidth: '100px'}} alt="" /><br />
                <img className="m-1" src={`${PUBLIC_URL}/images/no-photo.jpg`} style={{maxHeight: '100px', maxWidth: '100px'}} alt="" />
                <img className="m-1" src={`${PUBLIC_URL}/images/no-photo.jpg`} style={{maxHeight: '100px', maxWidth: '100px'}} alt="" />
                <img className="m-1" src={`${PUBLIC_URL}/images/no-photo.jpg`} style={{maxHeight: '100px', maxWidth: '100px'}} alt="" />
                <img className="m-1" src={`${PUBLIC_URL}/images/no-photo.jpg`} style={{maxHeight: '100px', maxWidth: '100px'}} alt="" />
                <img className="m-1" src={`${PUBLIC_URL}/images/no-photo.jpg`} style={{maxHeight: '100px', maxWidth: '100px'}} alt="" />
                <img className="m-1" src={`${PUBLIC_URL}/images/no-photo.jpg`} style={{maxHeight: '100px', maxWidth: '100px'}} alt="" />
                <img className="m-1" src={`${PUBLIC_URL}/images/no-photo.jpg`} style={{maxHeight: '100px', maxWidth: '100px'}} alt="" />
                <img className="m-1" src={`${PUBLIC_URL}/images/no-photo.jpg`} style={{maxHeight: '100px', maxWidth: '100px'}} alt="" />
                <img className="m-1" src={`${PUBLIC_URL}/images/no-photo.jpg`} style={{maxHeight: '100px', maxWidth: '100px'}} alt="" />
              </div>
              <div className="col-md-4">
                <div className="input-group" style={{marginBottom: '5px'}}>
                  <span className="input-group-btn">
                    <button className="btn btn-light" type="button" >Hình 0</button>
                  </span>
                  <input id="Picture" type="text" className="form-control" placeholder="Đường dẫn hình ảnh" />
                </div>
                <div className="input-group" style={{marginBottom: '5px'}}>
                  <span className="input-group-btn">
                    <button className="btn btn-light" type="button" >Hình 1</button>
                  </span>
                  <input id="Picture1" type="text" className="form-control" placeholder="Đường dẫn hình ảnh" />
                </div>
                <div className="input-group" style={{marginBottom: '5px'}}>
                  <span className="input-group-btn">
                    <button className="btn btn-light" type="button" >Hình 2</button>
                  </span>
                  <input id="Picture2" type="text" className="form-control" placeholder="Đường dẫn hình ảnh" />
                </div>
                <div className="input-group" style={{marginBottom: '5px'}}>
                  <span className="input-group-btn">
                    <button className="btn btn-light" type="button" >Hình 3</button>
                  </span>
                  <input id="Picture3" type="text" className="form-control" placeholder="Đường dẫn hình ảnh" />
                </div>
                <div className="input-group" style={{marginBottom: '5px'}}>
                  <span className="input-group-btn">
                    <button className="btn btn-light" type="button" >Hình 4</button>
                  </span>
                  <input id="Picture4" type="text" className="form-control" placeholder="Đường dẫn hình ảnh" />
                </div>
                <div className="input-group" style={{marginBottom: '5px'}}>
                  <span className="input-group-btn">
                    <button className="btn btn-light" type="button" >Hình 5</button>
                  </span>
                  <input id="Picture5" type="text" className="form-control" placeholder="Đường dẫn hình ảnh" />
                </div>
                <div className="input-group" style={{marginBottom: '5px'}}>
                  <span className="input-group-btn">
                    <button className="btn btn-light" type="button" >Hình 6</button>
                  </span>
                  <input id="Picture6" type="text" className="form-control" placeholder="Đường dẫn hình ảnh" />
                </div>
                <div className="input-group" style={{marginBottom: '5px'}}>
                  <span className="input-group-btn">
                    <button className="btn btn-light" type="button" >Hình 7</button>
                  </span>
                  <input id="Picture7" type="text" className="form-control" placeholder="Đường dẫn hình ảnh" />
                </div>
                <div className="input-group" style={{marginBottom: '5px'}}>
                  <span className="input-group-btn">
                    <button className="btn btn-light" type="button" >Hình 8</button>
                  </span>
                  <input id="Picture8" type="text" className="form-control" placeholder="Đường dẫn hình ảnh" />
                </div>
                <div className="input-group" style={{marginBottom: '5px'}}>
                  <span className="input-group-btn">
                    <button className="btn btn-light" type="button" >Hình 9</button>
                  </span>
                  <input id="Picture9" type="text" className="form-control" placeholder="Đường dẫn hình ảnh" />
                </div>
              </div>
              <div className="col-md-4">

              </div>
            </div>

          </div>
          <div className="tab-pane" id="tab3" role="tabpanel" aria-labelledby="tab-3">
            <CKEditor data={description} name="description" onChange={ evt => handleChangeCkeditor('description', evt) }
              config={
                configCkeditor()
              }
            />
          </div>
          <div className="tab-pane" id="tab4" role="tabpanel" aria-labelledby="tab-4">
            <CKEditor data={context} name="context" onChange={ evt => handleChangeCkeditor('context', evt) }
              config={
                configCkeditor()
              }
            />
          </div>
          <div className="tab-pane" id="tab5" role="tabpanel" aria-labelledby="tab-5">
            <CKEditor data={context1} name="context1" onChange={ evt => handleChangeCkeditor('context1', evt) }
              config={
                configCkeditor()
              }
            />
          </div>
        </div>
        <div className="text-center mt-3 mb-3">
          <button className="btn btn-primary btn-inline-block"><i className="fa fa-save"></i> Lưu sản phẩm</button>
        </div>
      </form>
    )
  }
  return (
    <Layout title="Product Insert" className="container pl-0 pr-0 pt-3 pb-2">
      {showError()}
      {showSuccess()}
      <h3 className="h6 w-100 mb-3">THÊM SẢN PHẨM</h3>
      {formInput()}
      <code>
        {JSON.stringify(values)}
      </code>
    </Layout>
  )
}

export default InsertProduct
