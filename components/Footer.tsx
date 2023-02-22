import logo from "../assets/logo";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
function Footer() {
  let logoV = Object.values(logo);
  return (
    <div className="w-full bg-[#101010] mt-16 pb-16 mb-0">
      <div className="w-4/5 m-auto">
        <div>
          <img src={logoV[0].src} alt="" />
        </div>
        <div className="flex justify-between text-sm w-full border-b-2 pb-5 border-[#262626] flex-wrap md:flex-nowrap child:p-2 child:w-1/2 md:child:w-auto">
          <div>
            <span className="text-base font-bold mb-3">Tổng đài</span>
            <ul className="space-y-1 cursor-pointer child-hover:text-blue-500">
              <li>
                Mua hàng: <span className="text-[#1964dc]">1900.9696.42</span>{" "}
                (7:30 - 22:00)
              </li>
              <li>
                CSKH: <span className="text-[#1964dc]">1900.9868.43</span> (8:00
                - 21:30)
              </li>
              <li>
                Kỹ thuật: <span className="text-[#1964dc]">1900.8668.54</span>{" "}
                (7:30 - 22:00)
              </li>
            </ul>
            <div className="mt-2">
              <span className="text-sm text-[#697975]">
                Kết nối với chúng tôi
              </span>
              <div className="flex mt-2 space-x-3">
                {" "}
                <div className="p-1.5 rounded-full bg-[#555555] cursor-pointer">
                  <a href="https://www.facebook.com/topzone.vn">
                    <FacebookIcon></FacebookIcon>
                  </a>
                </div>
                <div className="p-1.5 rounded-full bg-[#555555] cursor-pointer">
                  <a href="https://www.youtube.com/channel/UCoWdPNr8jSr7JM0OFlKvQHw">
                    <YouTubeIcon></YouTubeIcon>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <span className="text-base font-bold mb-3">Hệ thống cửa hàng</span>
            <ul className="space-y-1 cursor-pointer child-hover:text-blue-500">
              <li>Xem 100 cửa hàng</li>
              <li>Nội quy cửa hàng</li>
              <li>Chất lượng phục vụ</li>
              <li>Chính sách bảo hành & đổi trả</li>
            </ul>
          </div>
          <div>
            <span className="text-base font-bold mb-3">Hỗ trợ khách hàng</span>
            <ul className="space-y-1 cursor-pointer child-hover:text-blue-500">
              <li>Điều kiện giao dịch chung</li>
              <li>Hướng dẫn mua hàng online</li>
              <li>Chính sách giao hàng</li>
              <li>Hướng dẫn thanh toán</li>
            </ul>
          </div>
          <div>
            <span className="text-base font-bold mb-3">
              Về thương hiệu TopZone
            </span>
            <ul className="space-y-1 cursor-pointer child-hover:text-blue-500">
              <li>Tích điểm Quà tặng VIP</li>
              <li>Giới thiệu TopZone</li>
              <li>Bán hàng doanh nghiệp</li>
              <li>Chính sách bảo mật thông tin</li>
              <li>Xem bản mobile</li>
            </ul>
          </div>
          <div>
            <span className="text-base font-bold mb-3">
              Trung tâm bảo hành TopCare
            </span>
            <ul className="space-y-1 cursor-pointer child-hover:text-blue-500">
              <li>Giới thiệu TopCare</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between sm:flex-col md:flex-row">
          <div className="child:text-xs">
            <span>
              © 2018. Công ty cổ phần Thế Giới Di Động. GPDKKD: 0303217354 do sở
              KH & ĐT TP.HCM cấp ngày 02/01/2007.<br></br>Địa chỉ: 128 Trần
              Quang Khải, P. Tân Định, Q.1, TP. Hồ Chí Minh. Điện thoại: 028
              38125960.
            </span>
          </div>
          <div className="max-w-[45%]">
            <img src={logoV[1].src} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
