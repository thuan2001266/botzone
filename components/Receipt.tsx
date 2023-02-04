import { toCart, receipt, Products } from "../interface";

function Receipt({
  historyDataProp,
  receiptProductsProp,
}: {
  historyDataProp: receipt[];
  receiptProductsProp: Products[];
}) {
  return (
    <div className="absolute left-[-280px] top-11 w-[300px] z-50 bg-[#3e3e3f] rounded-2xl pb-3 ">
      {historyDataProp.map((e) => (
        <div className="px-3 pt-2" key={e.id + "e" + e.addresses}>
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
                {receiptProductsProp?.find((e2) => e2.id == es.id)?.name +
                  " | " +
                  receiptProductsProp?.find((e2) => e2.id == es.id)
                    ?.optionToBuy[es.spec] +
                  " | " +
                  receiptProductsProp?.find((e2) => e2.id == es.id)?.color[
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
