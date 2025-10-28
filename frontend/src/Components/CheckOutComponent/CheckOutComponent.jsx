import React from 'react'
import './CheckOutComponent.css'

const CheckOutComponent = () => {
  return (
    <div className="cartitems">
        <div className="cartitems-format-main">
            <p>Productos</p>
            <p>Titulo</p>
            <p>Precio</p>
            <p>Cantidad</p>
            <p>Total</p>
            <p>Remover</p>
        </div>
        <hr />
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Total</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>$</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Precio de envio</p>
                        <p>Gratis</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>$</h3>
                    </div>
                </div>
                <button>COMPRAR</button>
            </div>
            <div className="cartitems-promocode">
                <p>Canjea un codigo promocional</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='Codigo' />
                    <button>Canjear</button>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default CheckOutComponent