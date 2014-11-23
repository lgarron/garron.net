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
        width: 100%;
        height: 100%;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: 0;
      }
      .carousel a.caption {
        display: block;
        height: 30px;
        width: 100%;
        position: absolute;
        bottom: 0px;
        background: rgba(0, 0, 0, 0.6);
        color: rgba(255, 255, 255, 0.75);
        text-align: center;
        text-shadow: 0px 0px 2px rgb(0, 0, 0);
        font-size: 24px;
        text-overflow: ellipsis;
        padding: 30px; 0px
        text-decoration: none;
        transition: all 250ms;
      }
      .carousel a.caption:hover {
        text-decoration: underline;
        background: black;
        color: rgba(255, 255, 255, 1);
      }
    </style>
---

<div class="carousel">
  <div style="background-image: url('2560px-40/DSC00151.jpg')">
    <a class="caption" href="2560px/DSC00151.jpg">Ferris Wheel in Wiesbaden, Germany (2013).</a></div>
  <div style="background-image: url('2560px-40/DSC00482.jpg')">
    <a class="caption" href="2560px/DSC00482.jpg">Heldenplatz at the Hofburg Palace, Vienna (Jan 1, 2014).</a></div>
  <div style="background-image: url('2560px-40/DSC08938.jpg')">
    <a class="caption" href="2560px/DSC08938.jpg">Silhouettes in front of the DBX Conference at Fort Mason, San Francisco (2013).</a></div>
  <div style="background-image: url('2560px-40/DSC08963.jpg')">
    <a class="caption" href="2560px/DSC08963.jpg">Trees at Lake Lagunita, Stanford.</a></div>
  <div style="background-image: url('2560px-40/DSC08994.jpg')">
    <a class="caption" href="2560px/DSC08994.jpg">Mini T-Rex Roaring on Market Street, San Francisco (2013).</a></div>
  <div style="background-image: url('2560px-40/DSC09136.jpg')">
    <a class="caption" href="2560px/DSC09136.jpg">Fog encompassing the Richmond-San Rafael Bridge (2013).</a></div>
  <div style="background-image: url('2560px-40/DSC09275.jpg')">
    <a class="caption" href="2560px/DSC09275.jpg">BART Station, Millbrae (2013).</a></div>
  <div style="background-image: url('2560px-40/DSC09627.jpg')">
    <a class="caption" href="2560px/DSC09627.jpg">Sunset over the Golden Gate Bridge, San Francisco (2013).</a></div>
  <div style="background-image: url('2560px-40/DSC09838.jpg')">
    <a class="caption" href="2560px/DSC09838.jpg">Fireworks on the Fourth of July over San Francisco (2013).</a></div>
  <div style="background-image: url('2560px-40/IMG_0971.jpg')">
    <a class="caption" href="2560px/IMG_0971.jpg">Sunset View from Telegraph Hill, San Francisco (2013).</a></div>
  <div style="background-image: url('2560px-40/IMG_1896_899_900_tonemapped.jpg')">
    <a class="caption" href="2560px/IMG_1896_899_900_tonemapped.jpg">Gautor in Mainz, Germany (2013).</a></div>
  <div style="background-image: url('2560px-40/IMG_2348.jpg')">
    <a class="caption" href="2560px/IMG_2348.jpg">St. Bonifacius at the Mainzer Dom (2013).</a></div>
  <div style="background-image: url('2560px-40/IMG_6271.jpg')">
    <a class="caption" href="2560px/IMG_6271.jpg">Peggy the Angry Bird (2012).</a></div>
  <div style="background-image: url('2560px-40/IMG_9818_19_20_21_22_23_24_tonemapped_fused.jpg')">
    <a class="caption" href="2560px/IMG_9818_19_20_21_22_23_24_tonemapped_fused.jpg">Boat on the Rhine by Mainz, Germany (2013).</a></div>
  <div style="background-image: url('2560px-40/Berkeley Hills.jpg')">
    <a class="caption" href="2560px/Berkeley Hills.jpg">Fog over Berkeley (2014).</a></div>
  <div style="background-image: url('2560px-40/DSC01484.jpg')">
    <a class="caption" href="2560px/DSC01484.jpg">Ceiling at the Palace of Fine Arts, San Francisco (2014).</a></div>
  <div style="background-image: url('2560px-40/IMG_7264.jpg')">
    <a class="caption" href="2560px/IMG_7264.jpg">Intersection of Geary St. and Grant Ave. in San Francisco (2014).</a></div>
  <div style="background-image: url('2560px-40/IMG_9740.jpg')">
    <a class="caption" href="2560px/IMG_9740.jpg">Lens Flare over Night Sky (2014).</a></div>
  <div style="background-image: url('2560px-40/DSC02149.jpg')">
    <a class="caption" href="2560px/DSC02149.jpg">Grand Central Station in New York, Yew York (2014).</a></div>
  <div style="background-image: url('2560px-40/DSC04124_5_6_7_8_tonemapped.jpg')">
    <a class="caption" href="2560px/DSC04124_5_6_7_8_tonemapped.jpg">Garden and Hills near the Gwacheon National Science Museum near Seoul, Korea (2014).</a></div>
  <div style="background-image: url('2560px-40/DSC02112.jpg')">
    <a class="caption" href="2560px/DSC02112.jpg">AirTrain Tracks at JFK Airport, New York (2014).</a></div>
  <div style="background-image: url('2560px-40/IMG_7606.jpg')">
    <a class="caption" href="2560px/IMG_7606.jpg">Meow (2014).</a></div>
  <div style="background-image: url('2560px-40/DSC04024.jpg')">
    <a class="caption" href="2560px/DSC04024.jpg">Garden of the Gwacheon National Science Museum near Seoul, Korea (2014).</a></div>
</div>

<script type="text/javascript" src="files/slick/slick.js"> </script>
