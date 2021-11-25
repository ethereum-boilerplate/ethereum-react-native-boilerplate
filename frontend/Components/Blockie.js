import React, { Component, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const htmlContent = `
<!doctype html>
<head>
  <meta charset="utf-8">
  <style>
  #icon {
    width: 32px;
    height: 32px;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 50%;
    box-shadow: inset rgba(255, 255, 255, 0.6) 0 2px 2px, inset rgba(0, 0, 0, 0.3) 0 -2px 6px;
  }
  </style>
  <script>
    //Wrap Webview into a View to generate blocky using ethereum-blockies module https://github.com/ethereum/blockies/blob/master/blockies.min.js
    !function(){function e(e){for(var o=0;o<c.length;o++)c[o]=0;for(var o=0;o<e.length;o++)c[o%4]=(c[o%4]<<5)-c[o%4]+e.charCodeAt(o)}function o(){var e=c[0]^c[0]<<11;return c[0]=c[1],c[1]=c[2],c[2]=c[3],c[3]=c[3]^c[3]>>19^e^e>>8,(c[3]>>>0)/(1<<31>>>0)}function r(){var e=Math.floor(360*o()),r=60*o()+40+"%",t=25*(o()+o()+o()+o())+"%",l="hsl("+e+","+r+","+t+")";return l}function t(e){for(var r=e,t=e,l=Math.ceil(r/2),n=r-l,a=[],c=0;t>c;c++){for(var i=[],f=0;l>f;f++)i[f]=Math.floor(2.3*o());var s=i.slice(0,n);s.reverse(),i=i.concat(s);for(var h=0;h<i.length;h++)a.push(i[h])}return a}function l(o){var t={};return t.seed=o.seed||Math.floor(Math.random()*Math.pow(10,16)).toString(16),e(t.seed),t.size=o.size||8,t.scale=o.scale||4,t.color=o.color||r(),t.bgcolor=o.bgcolor||r(),t.spotcolor=o.spotcolor||r(),t}function n(e,o){var r=t(e.size),l=Math.sqrt(r.length);o.width=o.height=e.size*e.scale;var n=o.getContext("2d");n.fillStyle=e.bgcolor,n.fillRect(0,0,o.width,o.height),n.fillStyle=e.color;for(var a=0;a<r.length;a++)if(r[a]){var c=Math.floor(a/l),i=a%l;n.fillStyle=1==r[a]?e.color:e.spotcolor,n.fillRect(i*e.scale,c*e.scale,e.scale,e.scale)}return o}function a(e){var e=l(e||{}),o=document.createElement("canvas");return n(e,o),o}var c=new Array(4),i={create:a,render:n};"undefined"!=typeof module&&(module.exports=i),"undefined"!=typeof window&&(window.blockies=i)}();
    function generate(address, size, border) {
      var icon = document.getElementById('icon');
      icon.style.width = '' + size + 'px'
      icon.style.height = '' + size + 'px'
      icon.style.backgroundImage = 'url(' + blockies.create({ seed:address ,size: 8,scale: 8}).toDataURL()+')'
    }
  </script>
</head>
<body>
  <div id="icon"></div>
</body>
`;

function createBlockieIcon(generateCall) {
  return `document.body.style.backgroundColor = 'transparent';
    setTimeout(function() { ${generateCall} }, 1000);
    true; // note: this is required, or you'll sometimes get silent failures
    `;
}

const Blockie = (props) => {
  useEffect(() => {
    setTimeout(() => {
      this.webref.injectJavaScript(
        createBlockieIcon(`generate("${props.address}", "${props.size}")`)
      );
    }, 1000);
  }, [props.address, props.size]);

  return (
    <View
      style={{
        width: 50,
        height: 50,
        paddingLeft: 20,
        paddingTop: 10,
        justifyContent: "flex-end",
      }}>
      <WebView
        originWhitelist={["*"]}
        ref={(r) => (this.webref = r)}
        source={{ html: htmlContent }}
        // style={{
        //   width: 40,
        //   height: 40,
        //   justifyContent: "center",
        //   alignItems: "center",
        // }}
      />
    </View>
  );
};

export default Blockie;
