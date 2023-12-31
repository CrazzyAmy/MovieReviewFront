import {Link} from "react-router-dom"
import styles from './Productstyle.css'
import {useState, useEffect} from "react"  //React Hook
import Title from "./Title.js"
import QuantityBtn from "./QuantityBtn.js"
import axios from "axios"

export default function ProductList() {

    let [productList, setProductList] = useState([])
    let [input , setInput] = useState('')

    //useEffect hook
    useEffect(()=>{

        //1 : 無第二個參數 : component每次render都會觸發
        //2 : Dependency Array是空array時 : 只會在第一次網頁render時會觸發
        //3 : Dependency Array是有變數時 : 第一次網頁render時 + 指定的變數改變 會觸發
        // fetch('https://hoyinleung.github.io/demoapi/react-basic-product.json')
        //     .then(response => response.json())
        //     .then(data => setProductList(data))
        axios.get('https://localhost:8000/products',{
            //URL参數放在params屬性裏面
            params: {
                name: "蘋果",
                price: 5,
                image: "apple.jpg",
                description: "新鮮蘋果50克，一日一蘋果，醫生遠離我"
            }
        })
        .then((response) => console.log(response))
        .then(response => response.json())
        .then(data => setProductList(data))
        .catch((error) => console.log(error))    
                console.log(productList)
    },[]) // <==  Dependency Array

    return (
        <div>
            <Title mainTitle="請選擇要購買的水果" />
            
            <div>
                {
                    productList.map(product=>(
                        <div className={styles.productBorder} key={product.id}>
                            {product.name}<br/>
                            {product.price}元/件<br/>
                            <Link to={'/product/'+product.id}>
                            <img src={process.env.PUBLIC_URL+'/img/'+product.image} alt={product.name} />
                            </Link>
                            <br/>
                            {product.description}<br/>
                            <QuantityBtn productInfo={product} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}