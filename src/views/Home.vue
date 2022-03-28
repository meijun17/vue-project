<template>
<div>
  <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="../assets/images/index_6.jpg" class="picture" alt="...">
      <h2>品味收納</h2>
    </div>
    <div class="carousel-item">
      <img src="../assets/images/index_2.png" class="picture" alt="...">
      <h2>簡單生活</h2>
    </div>
    <div class="carousel-item">
      <img src="../assets/images/index_5.jpg" class="picture" alt="...">
      <h2>溫暖療癒</h2>
    </div>
  </div>
</div>
<div class="container">
    <div class="containerTitle">
      <h3>推薦商品</h3>
    </div>
    <div class="productsBox">
        <div class="product">
          <img src="https://images.unsplash.com/photo-1608181831688-b2a476cb100c?   ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&   auto=format&fit=crop&w=880&q=80" alt="">
          <p>$1350 →</p>
        </div>
        <div class="product">
          <img src="https://images.unsplash.com/photo-1608181831688-b2a476cb100c?   ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&   auto=format&fit=crop&w=880&q=80" alt="">
          <p>$1350 →</p>
        </div>
        <div class="product">
          <img src="https://images.unsplash.com/photo-1608181831688-b2a476cb100c?   ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&   auto=format&fit=crop&w=880&q=80" alt="">
          <p>$1350 →</p>
        </div>
        <div class="product">
          <img src="https://images.unsplash.com/photo-1608181831688-b2a476cb100c?   ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&   auto=format&fit=crop&w=880&q=80" alt="">
          <p>$1350 →</p>
        </div>
      </div>
  </div>
  <div class="backgroundImg"></div>
  <div class="container aboutBox">
    <div class="containerTitle">
      <h3>關於Light Life</h3>
    </div>
    <div class="about">
      <div>
        <img src="../assets/images/index_4.jpg" alt="">
      </div>
      <div class="txt">
        <p>那些平淡的日常中，與你相伴的物品帶著記憶，</p>
        <p>也蘊藏著生活的體會，</p>
        <p>相信簡單帶來的純粹與快樂，</p>
        <p>讓舒適簡單的居家收納，打造專屬你的溫暖小窩。</p>
      </div>
    </div>
  </div>
   <footer>
      <div class="container">
        <div class="d-flex justify-content-evenly align-items-center">
          <div class="d-flex align-items-center">
            <span class="title">追蹤我們</span>
            <a href="#"><i class='bx bxl-instagram' ></i></a>
            <a href="#"><i class='bx bxl-facebook-square' ></i></a>
          </div>
          <div class="d-flex align-items-center">
            <span class="title">聯繫我們</span>
            <i class='bx bx-phone'></i>
            <span class="txt">
              <a href="" >04-12345678</a>
            </span>
            <i class='bx bx-envelope'></i>
            <span  class="txt">
              <a href="">example@gmail.com</a>
            </span>
          </div>
        </div>
        <div class="copyright">
          <span class="txt">Copyright © 僅個人作品練習，無任何商業用途</span>
        </div>
      </div>
    </footer>
</div>

</template>

<script>

export default {
  name: 'Home'
}
</script>

<style>
  img{
      vertical-align: middle;
  }
  .picture{
    width: 100%;
    height: calc(100vh - 120px);
    object-fit: cover;
    object-position: 50% 50%;
  }
  .carousel-inner h2{
    position: absolute;
    top: 15%;
    left: 20%;
    font-size: 76px;
    font-weight: 800;
    letter-spacing: 5px;
    color: #fefefe;
  }
  .containerTitle h3{
    text-align: center;
    font-weight: 600;
    margin: 40px;
  }
  .productsBox{
    display: flex;
    flex-wrap: nowrap;
    justify-content:space-around;
  }
  .product{
    position: relative;
  }
  .product img{
    width: 300px;
  }
  .product p{
    border: 1px solid wheat;
    border-radius: 20px;
    padding: 5px 20px;
    cursor: pointer;
    color: white;
    font-size: 20px;
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .product p:hover{
    color: black;
    background: beige;
  }

  .about{
    display: flex;
  }
  .aboutBox img{
    width: 800px;
    padding: 0 40px;
  }

  .about .txt{
    display: flex;
    flex-direction: column;
    font-weight: 600;
    font-size: 18px;
    justify-content: center;
    padding: 0 40px;
  }

  .backgroundImg{
    background-image: url(../assets/images/index_1.png);
    background-size: cover;
    background-position: bottom;
    background-attachment: fixed;
    height: 400px;
    margin: 60px 0;
  }

  footer {
    margin-top: 60px;
    background: #eceef3;
  }

  footer .container{
    padding: 60px 15px;
  }

  footer .title{
    margin: 5px 10px;
    letter-spacing: 1px;
    color: #978c8c;
    font-weight: 400;
    font-size: 16px;
  }

  footer .txt a{
    text-decoration: none;
    margin: 5px 10px;
    letter-spacing: 1px;
    color: #978c8c;
    font-weight: 300;
    font-size: 16px;
  }

  footer .txt a:hover{
    color: #524b4b;
    text-decoration: underline;
  }

  footer a i{
    font-size: 36px;
    cursor: pointer;
  }

  footer i{
    font-size: 24px;
  }

  .copyright{
    padding: 10px;
    text-align: center;
    margin: 5px 10px;
    letter-spacing: 1px;
    color: #978c8c;
    font-weight: 300;
    font-size: 14px;
  }
</style>
