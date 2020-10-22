import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div class="Footer">
          <div className="container" id="footer-top">
            <div className="row">
              <div className="footer-top-left col-auto"><a href="/" title="Trang chủ">TRANG CHỦ</a>
              </div>
              <div className="footer-top-right col-auto flex-grow-1">
                <div className="pull-right"><label>Theo dõi chúng tôi</label>
                  <ul className="ft-social">
                    <li><a href="https://www.facebook.com/Trung-T%C3%A2m-Giao-N%C6%B0%E1%BB%9Bc-TPHCM-261817360848066/" target="_blank"><img alt="Facebook" src="/Images/facebook.png" loading="lazy" /></a></li>
                    <li><a href="javascript:void(0)" rel="nofollow" title="Theo dõi chúng tôi trên Twitter"><img src="/images/twitter.png" loading="lazy" /></a></li>
                    <li><a href="javascript:void(0)" rel="nofollow" target="_blank" title="Theo dõi chúng tôi trên Youtube"><img src="/images/youtube.png" loading="lazy" /></a></li>
                    <li><a href="javascript:void(0)" rel="nofollow" target="_blank" title="Theo dõi chúng tôi trên Google +"><img src="/images/google-plus.png" loading="lazy" /> </a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="clearfix">&nbsp;
          </div>
          <div className="secarea">
            <div className="container">
              <div className="row">
                <div className="col-sm-6 col-md-4 aliright">
                  <h4>Công ty TNHH iWater
                  </h4>                
                  <ul>
                    <li>65/9 Cao Xuân Dục, Phường 12, Quận 8, Tp. HCM</li>
                    <li><strong>Mã số thuế</strong>: <span style={{fontSize: '14px'}}>0314 380 803</span></li>
                    <li><strong>Điện thoại:</strong> (028)&nbsp;7309 9799<b>&nbsp; </b><strong style={{lineHeight: '20.8px'}}>Fax:</strong><span style={{lineHeight: '20.8px'}}>&nbsp;</span><span style={{lineHeight: '20.8px'}}>(028) 3847 9806</span></li>
                    <li><strong style={{lineHeight: '20.8px'}}>Văn Phòng:</strong><span style={{lineHeight: '20.8px'}}>&nbsp;</span>48 Nguyễn Thị Huỳnh, Phường 11, Quận Phú Nhuận</li>
                    <li><strong>Website:</strong>&nbsp;<a href="http://iwater.vn">http://iwater.vn</a>&nbsp;&nbsp;&nbsp;<strong>Email:</strong> <a href="mailto:nam@iwater.vn">nam@iwater.vn</a></li>
                  </ul>
                  <div className="clearfix">&nbsp;
                  </div>
                </div>
                <div className="col-sm-6 col-md-3 aliright">
                  <h4 className="white">Chính sách
                  </h4>
                  <ul className="foolist">
                    <li><a href="/thong-tin/hinh-thuc-thanh-toan-3.html" title="Quy định và hình thức thanh toán">Hình thức thanh toán</a></li>
                    <li><a href="/thong-tin/chinh-sach-giao-nhan-hang-hoa-4.html" title="Chính sách vận chuyển, giao nhận hàng hóa">Chính sách giao nhận hàng hóa</a></li>
                    <li><a href="thong-tin/chinh-sach-bao-hanh-san-pham-5.html" title="Chính sách bảo hành sản phẩm ">Chính sách bảo hành</a></li>
                    <li><a href="thong-tin/chinh-sach-doi-va-tra-hang-6.html" title="Chính sách đổi và trả hàng">Chính sách đổi và trả hàng</a></li>
                    <li><a href="thong-tin/chinh-sach-bao-mat-thong-tin-khach-hang-7.html" title="Chính sách bảo mật thông tin khách hàng">Chính sách bảo mật thông tin</a></li>
                  </ul>
                </div>
                <div className="col-sm-6 col-md-2 aliright">
                  <h4 className="white">Về chúng tôi
                  </h4>
                  <ul className="foolist">
                    <li><a href="/thong-tin/gioi-thieu-2.html" title="Giới thiệu">Giới thiệu</a></li>
                    <li><a href="/thong-tin/khach-hang-chung-toi-6694.html" title="Khách hàng chúng tôi">Khách hàng</a></li>
                    <li><a href="/tuyen-dung.html" title="Tuyển dụng">Tuyển dụng</a></li>
                    <li><a href="/diem-giao-nuoc-iwater.html">Tin tức</a></li>
                    <li><a href="/video.html">Video</a></li>
                    <li><a href="/thong-tin/lien-he-1.html" title="Liên hệ">Liên hệ</a></li>
                  </ul>
                </div>
                <div className="col-sm-6 col-md-3 last aliright">
                  <div className="fb-page" data-hide-cover="false" data-href="https://www.facebook.com/Trung-T%25C3%25A2m-Giao-N%25C6%25B0%25E1%25BB%259Bc-TPHCM-261817360848066/?fref=nf" data-show-facepile="false" data-show-posts="false" data-width={380}>&nbsp;
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="clearfix">&nbsp;
          </div>
          <div className="copyrights">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-6">Copyright © 2016 iWater. All rights reserved.
                </div>
                <div className="col-sm-6 last aliright">Design and Developed by: <a href="http://adsvietnam.vn" style={{color: 'yellow'}} target="_blank" title="Thiết kế website bởi HieuNguyen">HieuNguyen</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer;
