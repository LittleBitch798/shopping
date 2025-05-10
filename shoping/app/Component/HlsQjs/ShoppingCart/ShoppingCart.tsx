'use client'
const ShoppingCart = () => {

    return (
        <div className="flex justify-center items-center">
            <div className="bg-green-100 w-1/2 h-screen flex-col">
                <div>
                    <div className="flex flex-row text-center">
                        <div className="w-2/5 p-5 border-spacing-1">商品</div>
                        <div className="flex-1 p-5">单价</div>
                        <div className="flex-1 p-5">数量</div>
                        <div className="flex-1 p-5">操作</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ShoppingCart;
