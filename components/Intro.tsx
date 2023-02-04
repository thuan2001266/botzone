import TaskAltIcon from "@mui/icons-material/TaskAlt";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
function Intro() {
  return (
    <div className="bg-[#323232] md:block">
      <div className="grid grid-cols-2 md:grid-cols-4 w-4/5 m-auto pt-7 pb-7 justify-center flex-wrap">
        <div className="flex flex-col items-center sm:pt-4">
          <div>
            <TaskAltIcon />
          </div>
          <p className=" lg:block text-center">
            Mẫu mã<br></br>đa dạng, chính hãng
          </p>
        </div>
        <div className="flex flex-col items-center sm:pt-4">
          <div>
            <LocalShippingOutlinedIcon />
          </div>
          <p className=" lg:block text-center">Giao hàng toàn quốc</p>
        </div>
        <div className="flex flex-col items-center sm:pt-4">
          <div>
            <ShieldOutlinedIcon />
          </div>
          <p className=" lg:block text-center">
            Bảo hành<br></br>có cam kết tới 12 tháng
          </p>
        </div>
        <div className="flex flex-col items-center sm:pt-4">
          <div>
            <RestartAltOutlinedIcon />
          </div>

          <p className=" lg:block text-center">
            Có thể đổi trả tại<br></br>Thegioididong và DienmayXANH
          </p>
        </div>
      </div>
    </div>
  );
}

export default Intro;
