import { toCart } from "../interface";

function Receipt({ historyData, receiptProducts }) {
  return (
    <div className="absolute left-[-280px] top-11 w-[300px] z-50 bg-[#3e3e3f] rounded-2xl pb-3 ">
      {historyData.map((e) => (
        <div
          className="px-3 pt-2"
          key={
            e.id +
            "e" +
            e.addresses.color +
            "e" +
            e.addresses.quant +
            "e" +
            e.addresses.spec
          }
        >
          <div>
            <span className="font-bold mr-1">Đơn hàng:</span>
            {e.id}
          </div>
          <div>
            <div className="font-bold">Sản phẩm:</div>
            {e.addresses.map((es: toCart) => (
              <div
                key={es.id + "e" + es.color + "e" + es.quant + "e" + es.spec}
              >
                {receiptProducts?.find((e2) => e2.id == es.id)?.name +
                  " | " +
                  receiptProducts?.find((e2) => e2.id == es.id)?.option[
                    es.spec
                  ] +
                  " | " +
                  receiptProducts?.find((e2) => e2.id == es.id)?.color[
                    es.color
                  ] +
                  " | SL: " +
                  es.quant}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Receipt;
