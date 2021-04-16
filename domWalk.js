
        function domWalk(start, end, container, func){
          let stop = false;
          let exclude = [];

          checkNode(start);

          function checkNode(e){
            if(!e || e == container|| exclude.some(el=>el == e) || stop)return;
            if(func(e)){
              stop = true;
              return;
            }
            if(e == end){
              if(e.nodeName == '#text')checkNode(e.parentElement);
              stop = true;
              //l('END', e)
              return;
            }

            exclude.push(e);
            //l(e);

            e.childNodes.forEach(checkNode);
            checkNode(e.nextElementSibling);

            if(e.nodeName != '#text'){
              let p = e.previousElementSibling;
              while(p){
                exclude.push(p);
                p = p.previousElementSibling;
              }
            }
            checkNode(e.parentElement);
          }
        }
