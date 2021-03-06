import React, {useState, Fragment} from 'react';
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './ShowImage'
import noPhoto from '../images/no-photo.png'
import {addItem, updateItem, removeItem} from './cartHelpers'
import moment from 'moment'
import NumberFormat from 'react-number-format';
import { Row, Col } from 'react-bootstrap'
const Card = ({product, showViewProductButton = true, isLayoutProductInfo = false, showAddToCartButton = true, viewLayout = "grid", cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f, // default value of function
  run = undefined // default value of undefined
  }) => {
    const showViewButton = () => {
      return(
        showViewProductButton && (
            <Link to={`/product/${product._id}`} title={product.name}>
              <button className="card-link btn btn-outline-primary">
                Xem chi tiết
              </button>
            </Link>
          )
        )
    }
    const showAddToCart = (showAddToCartButton) => {
      return showAddToCartButton && (
        <button onClick={addToCart} className="OrderProductButton ml-auto card-link btn btn-outline-warning">
            Mua ngay
        </button>
      )
    }
    // Cart
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)
    const addToCart = () => {
      addItem(product, ()=> {
        setRedirect(true)
      })
    }
    const shouldRedirect = redirect => {
      if(redirect) {
        return <Redirect to="/cart"/>
      }
    }
    const showCartUpdateOptions = cartUpdate => {
      return cartUpdate && (
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text mr-3">Adjust Quantity</span>
          </div>
          <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}></input>
        </div>
      )
    }
    const handleChange = productId => event => {
      setRun(!run);
      setCount(event.target.value < 1 ? 1 : event.target.value)
      if(event.target.value >= 1) {
        // importy {updateItem} from './cartHelpers'
        updateItem(productId, event.target.value)
      }
    }
    const showRemoveButton = (showRemoveProductButton) => {
      return showRemoveProductButton && (
        <button onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }} className="ml-auto card-link btn btn-outline-danger">
            Remove
        </button>
      )
    }
    // End Cart
    const layoutProductInfo = () => {
      if(!isLayoutProductInfo) {
        // List
        if( viewLayout !== "grid") {
          return (
              <Row className="row">
                <Col xs={3}>
                  <ShowImage item={product} url="product"/>
                </Col>
                <Col xs={9}>
                  <h2 className="h5 font-weight-bold">{product.name}</h2>
                  <p className="card-text text-muted small mb-1">Category: { product.category && product.category.name }</p>
                  <p className="card-title text-muted small">Add on {moment(product.createdAt).fromNow()}</p>
                  <p className="card-title font-weight-bold text-danger price"><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={''} suffix={' đ'}/></p>
                  <p className="card-text description">{product.description.substring(0,100)}</p>
                  {shouldRedirect(redirect)}
                  <div className="d-flex">
                    { showViewButton(showViewProductButton) }
                    { showAddToCart(showAddToCartButton) }
                    { showCartUpdateOptions(cartUpdate) }
                    { showRemoveButton(showRemoveProductButton) }
                  </div>
                </Col>
                <div className="border-bottom mb-3 pb-3 clearfix col-12"></div>
              </Row>
          )
        }
        else {
          // Grid
          return (
            <Col className="Home-Product">
                <Link to={`/product/${product._id}`} title={product.name}>
                <figure className="left-block">
                  <span className="middle">
                    {shouldRedirect(redirect)}
                    <img className="f-select" src={product.pictures && product.pictures.length ? product.pictures[0].url_mobile : noPhoto }/>
                  </span>
                  <div className="employee-hover-overlay" />
                </figure>
                <div className="right-block">
                  <h3 className="ProductName">{product.productName}</h3>
                  <h3 className="ProductGroupName">{ product.category && product.category.name }</h3>
                  <div className="content_price">
                    <b className="clearfix ProductPriceNew">{ product.productPriceNew && product.productPriceNew > 0 ? <NumberFormat value={product.productPriceNew} displayType={'text'} thousandSeparator={true} prefix={''} suffix={' đ'}/> : <span className="price-contact">Liên hệ</span> }</b>
                  </div>
                </div>
              </Link>
              { showAddToCart(showAddToCartButton) }
            </Col>


          )
        }
      }
      else {
        return (
          <div id="Product" className="Product clearfix">
            <div className="clearfix ProductInfo" itemScope itemType="http://schema.org/Product">
              <Row className="row">
                <Col className="col-12 col-xs-12 col-sm-12 col-md-6">
                  <div className="clearfix productinfo-left-inner">
                    <Row className="row">

                      <Col className="col-12 col-xs-12">
                        <figure id="Gallery" className="Pictures popup-gallery owl-carousel owl-theme">
                          <a className="f-item" title href="/Image/Picture/lavie%20viva.png">
                            <img src={product.pictures && product.pictures.length ? product.pictures[0].url : noPhoto} alt={product.productName} status={product.status2} />
                          </a>
                        </figure>
                      </Col>
                    </Row>
                    <div className="d-none d-sm-none d-md-block">
                      <div className="ProductInfoVisit CreateDate"><span><i className="fa fa-clock-o" /> <time>{moment(product.createdAt).format('DD/MM/YYYY | hh:mm:ss')}</time></span><span className="pull-right"><i className="fa fa-eye" /> 10797</span></div><br />
                      <div className="clearfix" id="Social">
                        <div className="addthis_inline_share_toolbox_2lfo" />
                      </div>
                      <div className="clearfix" />
                    </div>
                  </div>
                </Col>
                <Col className="col-12 col-xs-12 col-sm-12 col-md-6">
                  <div className="clearfix productinfo-right-inner">
                    <h1 itemProp="name" className="ProductNameLink ProductNameLinkDetail w-100">{product.productName}</h1>
                    <div className="clearfix ProductMeta w-100" itemProp="offers" itemScope itemType="http://schema.org/Offer">
                      <div className="clearfix" itemProp="offers" itemScope itemType="http://schema.org/Offer">
                        <meta itemProp="priceCurrency" content="VND" />
                        <p className="ProductPriceNew clearfix">Giá: <span itemProp="price">
                          {product.productPriceNew && product.productPriceNew > 0 ? <NumberFormat value={product.productPriceNew} displayType={'text'} thousandSeparator={true} prefix={''} suffix={' đ'}/> : <span class="contact-price">Liên hệ</span> }
                        </span></p>
                      </div>
                    </div>
                    <div className="select-box-area clearfix">
                      <span className="select-box-lable d-block mb-2">Số lượng:</span>
                      <div id="item-select-box" className="row align-items-center">
                        <div className="col-4 col-xs-4">
                          <select className="form-control text-center">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                        <Col className="col-8 col-xs-8 text-center">
                          <Row className="row">
                            <Col className="col-8 col-xs-12 col-sm-6 col-md-auto OrderProductButton"><button className="btn btn-lg text-nowrap pl-4 pr-4"><i className="fa fa-cart-plus" /> Mua ngay</button></Col>
                          </Row>
                        </Col>
                      </div>
                    </div>
                    <div className="quickSpecs clearfix">
                      <article id="Context" className="Context" itemProp="description" dangerouslySetInnerHTML={{__html: product.description}}>
                      </article>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="clearfix mt-4"></div>
              {
                product.context && (
                  <Row>
                    <Col>
                      <section className="clearfix">
                        <div className="AsideTitle3">
                          <span className="name shadow">Thông tin chi tiết</span>
                        </div>
                        <article id="Context1" className="Context clearfix" dangerouslySetInnerHTML={{__html:product.context}}>
                        </article>
                      </section>
                    </Col>
                  </Row>
                )
              }

            </div>
          </div>
        )
      }
    }
    return (
        <Fragment>
          {layoutProductInfo()}
        </Fragment>
    );
};

export default Card;
