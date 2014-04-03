---
layout: full
title: Photography | garron.net
contentStyle: full
topic: photography
head: |
    <meta name="viewport" content="minimal-ui" />
    <link rel="stylesheet" type="text/css" href="files/slick/slick.css"/>
    <script type="text/javascript" src="/files/js/jquery.js"> </script>
    <script>
      /* TODO:
         - Don't autoplay after clicking/swiping
         - buttons within full-screen div
         - fade during autoplay, slide for swipe/arrow key
      */
      $(document).ready(function(){

        $('.carousel').slick({
          arrows: false,
          autoplay: true,
          autoplaySpeed: 10000
          // fade: true
        });

        // Start on a random slide.
        var idx = Math.floor(Math.random() * $(".carousel .slick-slide").length);
        $(".carousel").slickGoTo(idx);
      });
    </script>
    <style>
      .slick-slider {
        margin-bottom: 0;
      }
      #header , #header * {
        z-index: 10;
      }
      #header img {
        display: none;
      }
      #header ul {
        background: rgba(0, 0, 0, 0.5);
      }
      #header li {
        margin-top: 12px;
        margin-bottom: 12px;
      }
      .carousel {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
      }
      .carousel div {
        width: 100%;
        height: 100%;
        z-index: 0;
      }
      .carousel div a {
        display: block;
        width: 100%;
        height: 100%;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: 0;
      }
    </style>
---

<div class="carousel">
  <div><a href="2560px/DSC00151.jpg" style="background-image: url('2560px/DSC00151.jpg')"> </a></div>
  <div><a href="2560px/DSC00442_.jpg" style="background-image: url('2560px/DSC00442_.jpg')"> </a></div>
  <div><a href="2560px/DSC00482.jpg" style="background-image: url('2560px/DSC00482.jpg')"> </a></div>
  <div><a href="2560px/DSC03400.jpg" style="background-image: url('2560px/DSC03400.jpg')"> </a></div>
  <div><a href="2560px/DSC08606.jpg" style="background-image: url('2560px/DSC08606.jpg')"> </a></div>
  <div><a href="2560px/DSC08938.jpg" style="background-image: url('2560px/DSC08938.jpg')"> </a></div>
  <div><a href="2560px/DSC08963.jpg" style="background-image: url('2560px/DSC08963.jpg')"> </a></div>
  <div><a href="2560px/DSC08993.jpg" style="background-image: url('2560px/DSC08993.jpg')"> </a></div>
  <div><a href="2560px/DSC08994.jpg" style="background-image: url('2560px/DSC08994.jpg')"> </a></div>
  <div><a href="2560px/DSC09136.jpg" style="background-image: url('2560px/DSC09136.jpg')"> </a></div>
  <div><a href="2560px/DSC09222.jpg" style="background-image: url('2560px/DSC09222.jpg')"> </a></div>
  <div><a href="2560px/DSC09275.jpg" style="background-image: url('2560px/DSC09275.jpg')"> </a></div>
  <div><a href="2560px/DSC09627.jpg" style="background-image: url('2560px/DSC09627.jpg')"> </a></div>
  <div><a href="2560px/DSC09838.jpg" style="background-image: url('2560px/DSC09838.jpg')"> </a></div>
  <div><a href="2560px/IMG_0004_7_8_tonemapped.jpg" style="background-image: url('2560px/IMG_0004_7_8_tonemapped.jpg')"> </a></div>
  <div><a href="2560px/IMG_0971.jpg" style="background-image: url('2560px/IMG_0971.jpg')"> </a></div>
  <div><a href="2560px/IMG_1654_7_8_fused.jpg" style="background-image: url('2560px/IMG_1654_7_8_fused.jpg')"> </a></div>
  <div><a href="2560px/IMG_1896_899_900_tonemapped.jpg" style="background-image: url('2560px/IMG_1896_899_900_tonemapped.jpg')"> </a></div>
  <div><a href="2560px/IMG_2348.jpg" style="background-image: url('2560px/IMG_2348.jpg')"> </a></div>
  <div><a href="2560px/IMG_3042.jpg" style="background-image: url('2560px/IMG_3042.jpg')"> </a></div>
  <div><a href="2560px/IMG_3247_tonemapped.jpg" style="background-image: url('2560px/IMG_3247_tonemapped.jpg')"> </a></div>
  <div><a href="2560px/IMG_6271.jpg" style="background-image: url('2560px/IMG_6271.jpg')"> </a></div>
  <div><a href="2560px/IMG_9818_19_20_21_22_23_24_tonemapped_fused.jpg" style="background-image: url('2560px/IMG_9818_19_20_21_22_23_24_tonemapped_fused.jpg')"> </a></div>
  <div><a href="2560px/Sky after FNW..jpg" style="background-image: url('2560px/Sky after FNW..jpg')"> </a></div>
  <div><a href="2560px/old_union_all_in_focus.jpg" style="background-image: url('2560px/old_union_all_in_focus.jpg')"> </a></div>
  <div><a href="2560px/IMG_0947_51_tonemapped.jpg" style="background-image: url('2560px/IMG_0947_51_tonemapped.jpg')"> </a></div>
</div>

<script type="text/javascript" src="files/slick/slick.js"> </script>
