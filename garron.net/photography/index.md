---
layout: default
title: Photography | garron.net
contentStyle: full
topic: photography
head: |
    <meta name="viewport" content="minimal-ui" />
    <script type="text/javascript" charset="utf-8">
      $(window).load(function() {
        $('.flexslider').flexslider({
          animationSpeed: 0.5
        });
      });
    </script>
    <style>
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
      body {
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        transition: 5s;
      }
    </style>
---

<script>
/*
Yes, that's right; some silly Javascript!
This is mostly because itI haven't yet found a gallery library that is simple, customizable, and not overly complex.
*/
var bg = [
  "2560px/DSC00151.jpg",
  "2560px/DSC00442_.jpg",
  "2560px/DSC00482.jpg",
  "2560px/DSC03400.jpg",
  "2560px/DSC08606.jpg",
  "2560px/DSC08938.jpg",
  "2560px/DSC08963.jpg",
  "2560px/DSC08993.jpg",
  "2560px/DSC08994.jpg",
  "2560px/DSC09136.jpg",
  "2560px/DSC09222.jpg",
  "2560px/DSC09275.jpg",
  "2560px/DSC09627.jpg",
  "2560px/DSC09838.jpg",
  "2560px/IMG_0004_7_8_tonemapped.jpg",
  "2560px/IMG_0971.jpg",
  "2560px/IMG_1654_7_8_fused.jpg",
  "2560px/IMG_1896_899_900_tonemapped.jpg",
  "2560px/IMG_2348.jpg",
  "2560px/IMG_3042.jpg",
  "2560px/IMG_3247_tonemapped.jpg",
  "2560px/IMG_6271.jpg",
  "2560px/IMG_9818_19_20_21_22_23_24_tonemapped_fused.jpg",
  "2560px/Sky after FNW..jpg",
  "2560px/old_union_all_in_focus.jpg"
];
var idx = Math.floor(Math.random()*bg.length);
document.body.style.backgroundImage = "url('" + bg[idx] + "')";
</script>