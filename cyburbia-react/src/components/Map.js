import React, {Component, useRef, useEffect, useState } from 'react';


    var perf =require('./Map.html');

function  Map() {
      return (
         <iframe src={perf }></iframe>   /* like this */
      );
   }


export default Map;