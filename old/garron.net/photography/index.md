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
      $(".slick-list.draggable").get(0).focus(); // Set DOM focus on the element so that we can use the keyboard immediately.
    });
  </script>
  <style>
    .slick-slider {
      margin-bottom: 0;
    }
    .slick-list.dragging {
      cursor: ew-resize;
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
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      z-index: 0;
    }
    .carousel a.caption {
      display: block;
      width: 100%;
      position: absolute;
      bottom: 0px;
      background: rgba(0, 0, 0, 0.6);
      color: rgba(255, 255, 255, 0.75);
      text-align: center;
      text-shadow: 0px 0px 2px rgb(0, 0, 0);
      font-size: 24px;
      text-overflow: ellipsis;
      padding: 20px;
      box-sizing: border-box;
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

<div class="carousel" tabindex="0">
  <div style="background-position: 50% 52%; background-image: url('2560px-40/DSC00151.jpg')">
    <a class="caption" href="high-res/DSC00151.jpg">Ferris Wheel in Wiesbaden, Germany (2013).</a></div>
  <div style="background-position: 42% 10%;background-image: url('2560px-40/DSC00482.jpg')">
    <a class="caption" href="high-res/DSC00482.jpg">Heldenplatz at the Hofburg Palace, Vienna (Jan 1, 2014).</a></div>
  <div style="background-position: 50% 47%; background-image: url('2560px-40/DSC08938.jpg')">
    <a class="caption" href="high-res/DSC08938.jpg">Silhouettes in front of the DBX Conference at Fort Mason, San Francisco (2013).</a></div>
  <div style="background-position: 50% 50%; background-image: url('2560px-40/DSC08963.jpg')">
    <a class="caption" href="high-res/DSC08963.jpg">Trees at Lake Lagunita, Stanford.</a></div>
  <div style="background-position: 50% 15%; background-image: url('2560px-40/DSC08994.jpg')">
    <a class="caption" href="high-res/DSC08994.jpg">Mini T-Rex Roaring on Market Street, San Francisco (2013).</a></div>
  <div style="background-position: 65% 85%; background-image: url('2560px-40/DSC09136.jpg')">
    <a class="caption" href="high-res/DSC09136.jpg">Fog encompassing the Richmond-San Rafael Bridge (2013).</a></div>
  <div style="background-position: 50% 75%; background-image: url('2560px-40/DSC09275.jpg')">
    <a class="caption" href="high-res/DSC09275.jpg">BART Station, Millbrae (2013).</a></div>
  <div style="background-position: 50% 60%; background-image: url('2560px-40/DSC09627.jpg')">
    <a class="caption" href="high-res/DSC09627.jpg">Sunset over the Golden Gate Bridge, San Francisco (2013).</a></div>
  <div style="background-position: 30% 25%; background-image: url('2560px-40/DSC09838.jpg')">
    <a class="caption" href="high-res/DSC09838.jpg">Fireworks on the Fourth of July over San Francisco (2013).</a></div>
  <div style="background-position: 50% 70%; background-image: url('2560px-40/IMG_0971.jpg')">
    <a class="caption" href="high-res/IMG_0971.jpg">Sunset View from Telegraph Hill, San Francisco (2013).</a></div>
  <div style="background-position: 50% 50%; background-image: url('2560px-40/IMG_1896_899_900_tonemapped.jpg')">
    <a class="caption" href="high-res/IMG_1896_899_900_tonemapped.jpg">Gautor in Mainz, Germany (2013).</a></div>
  <div style="background-position: 50% 30%; background-image: url('2560px-40/IMG_2348.jpg')">
    <a class="caption" href="high-res/IMG_2348.jpg">St. Bonifacius at the Mainzer Dom (2013).</a></div>
  <div style="background-position: 40% 50%; background-image: url('2560px-40/IMG_6271.jpg')">
    <a class="caption" href="high-res/IMG_6271.jpg">Peggy the Angry Bird (2012).</a></div>
  <div style="background-position: 50% 50%; background-image: url('2560px-40/focus.jpg')">
    <a class="caption" href="high-res/focus.jpg">Focus (2012).</a></div>
  <div style="background-position: 50% 80%; background-image: url('2560px-40/IMG_9818_19_20_21_22_23_24_tonemapped_fused.jpg')">
    <a class="caption" href="high-res/IMG_9818_19_20_21_22_23_24_tonemapped_fused.jpg">Boat on the Rhine by Mainz, Germany (2013).</a></div>
  <div style="background-position: 50% 40%; background-image: url('2560px-40/Berkeley Hills.jpg')">
    <a class="caption" href="high-res/Berkeley Hills.jpg">Fog over Berkeley (2014).</a></div>
  <div style="background-position: 50% 50%; background-image: url('2560px-40/DSC01484.jpg')">
    <a class="caption" href="high-res/DSC01484.jpg">Ceiling at the Palace of Fine Arts, San Francisco (2014).</a></div>
  <div style="background-position: 50% 75%; background-image: url('2560px-40/IMG_7264.jpg')">
    <a class="caption" href="high-res/IMG_7264.jpg">Intersection of Geary St. and Grant Ave. in San Francisco (2014).</a></div>
  <div style="background-position: 50% 0%; background-image: url('2560px-40/IMG_9740.jpg')">
    <a class="caption" href="high-res/IMG_9740.jpg">Lens Flare over Night Sky (2014).</a></div>
  <div style="background-position: 43% 50%; background-image: url('2560px-40/DSC02149.jpg')">
    <a class="caption" href="high-res/DSC02149.jpg">Grand Central Station in New York, Yew York (2014).</a></div>
  <div style="background-position: 50% 50%; background-image: url('2560px-40/DSC04124_5_6_7_8_tonemapped.jpg')">
    <a class="caption" href="high-res/DSC04124_5_6_7_8_tonemapped.jpg">Garden and Hills near the Gwacheon National Science Museum near Seoul, Korea (2014).</a></div>
  <div style="background-position: 50% 30%; background-image: url('2560px-40/DSC02112.jpg')">
    <a class="caption" href="high-res/DSC02112.jpg">AirTrain Tracks at JFK Airport, New York (2014).</a></div>
  <div style="background-position: 35% 60%; background-image: url('2560px-40/IMG_7606.jpg')">
    <a class="caption" href="high-res/IMG_7606.jpg">Meow (2014).</a></div>
  <div style="background-position: 80% 65%; background-image: url('2560px-40/DSC04024.jpg')">
    <a class="caption" href="high-res/DSC04024.jpg">Garden of the Gwacheon National Science Museum near Seoul, Korea (2014).</a></div>
  <div style="background-position: 60% 45%; background-image: url('2560px-40/bay-bridge.jpg')">
    <a class="caption" href="high-res/bay-bridge.jpg">Bay Bridge in the morning, San Francisco (2015).</a></div>
  <div style="background-position: 53% 50%; background-image: url('2560px-40/chabot.jpg')">
    <a class="caption" href="high-res/chabot.jpg">Observatory of the Chabot Space and Science Center, Oakland (2015).</a></div>
  <div style="background-position: 50% 50%; background-image: url('2560px-40/creases.jpg')">
    <a class="caption" href="high-res/creases.jpg">Creases in a sheet (2014).</a></div>
  <div style="background-position: 65% 50%; background-image: url('2560px-40/crypto-machine.jpg')">
    <a class="caption" href="high-res/crypto-machine.jpg">WWII-era cryptography machine at MoMath, New York. (2014).</a></div>
  <div style="background-position: 50% 60%; background-image: url('2560px-40/cube-perspective.jpg');">
    <a class="caption" href="high-res/cube-perspective.jpg">Cube Perspective (2014).</a></div>
  <div style="background-position: 50% 50%; background-image: url('2560px-40/gloriette.jpg')">
    <a class="caption" href="high-res/gloriette.jpg">Gloriette at Schönbrunn in München, Germany (2014).</a></div>
  <div style="background-position: 50% 50%; background-image: url('2560px-40/marktkirche.jpg')">
    <a class="caption" href="high-res/marktkirche.jpg">Marktkirche in Wiesbaden, Germany (2014).</a></div>
  <div style="background-position: 50% 25%; background-image: url('2560px-40/mitzi.jpg');">
    <a class="caption" href="high-res/mitzi.jpg">Mitzi (2015).</a></div>
  <div style="background-position: bottom; background-image: url('2560px-40/paper-store.jpg');">
    <a class="caption" href="high-res/paper-store.jpg">Paper store in Tokyo, Japan (2014).</a></div>
  <div style="background-position: 50% 50%; background-image: url('2560px-40/staatskanzlei.jpg')">
    <a class="caption" href="high-res/staatskanzlei.jpg">Staatskanzlei in München, Germany (2014).</a></div>
  <div style="background-position: 50% 50%; background-image: url('2560px-40/magnify.jpg')">
    <a class="caption" href="high-res/magnify.jpg">The Alchemist (2015).</a></div>
  <div style="background-position: 62% 47%; background-image: url('2560px-40/orchid.jpg')">
    <a class="caption" href="high-res/orchid.jpg">Orchid (2013).</a></div>
  <div style="background-position: 50% 50%; background-image: url('2560px-40/nymphenburg.jpg')">
    <a class="caption" href="high-res/nymphenburg.jpg">Schloss Nymphenburg in München, Germany (2014).</a></div>
  <div style="background-position: 53% 50%; background-image: url('2560px-40/sydney-opera-house.jpg')">
    <a class="caption" href="high-res/sydney-opera-house.jpg">Sydney Opera House (2016).</a></div>
  <div style="background-position: 30% 20%; background-image: url('2560px-40/prague-castle.jpg')">
    <a class="caption" href="high-res/prague-castle.jpg">Prague Castle at night, viewed from Charles Bridge (2017).</a></div>
  <div style="background-position: 40% 35%; background-image: url('2560px-40/paris-seine-eiffel-tower.jpg')">
    <a class="caption" href="high-res/paris-seine-eiffel-tower.jpg">Eiffel Tower and flooded Seine (2018).</a></div>
  <div style="background-position: 58% 55%; background-image: url('2560px-40/IMG_9949.jpg')">
    <a class="caption" href="high-res/IMG_9949.jpg">San Francisco and the Bay Bridge (2021).</a></div>
</div>

<script type="text/javascript" src="files/slick/slick.js"> </script>
