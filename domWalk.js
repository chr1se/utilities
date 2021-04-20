//accepts Range object 
function domWalk({startContainer:start, endContainer:end, commonAncestorContainer:container}, func){
          let stop = false;
          let exclude = [];

          checkNode(start);

          function checkNode(e){
            if(!e || exclude.some(el=>el == e) || !e.textContent.trim() || stop)return;
            
            exclude.push(e);

            if(func(e)){
              //l('FOUND', e);
              stop = true;
              return;
            }
            if(e == end){
              if(e == start)func(e.parentElement);

              //l('END', e);
              stop = true;
              return;
            }

            
            //l(e);

            e.childNodes.forEach(checkNode);
            checkNode(e.nextSibling);

            let prev = e.previousSibling;
            while(prev){
              exclude.push(prev);
              prev = prev.previousSibling;
            }
            
            if(e != container)checkNode(e.parentElement);
          }
        }
