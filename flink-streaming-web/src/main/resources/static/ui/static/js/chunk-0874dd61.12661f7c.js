(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0874dd61"],{"09ca":function(e,t,i){"use strict";i("d7ff")},1455:function(e,t,i){},"6a3f":function(e,t,i){"use strict";i("1455")},7913:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"components-container"},[i("aside",[e._v("This is based on "),i("a",{staticClass:"link-type",attrs:{href:"//github.com/dai-siki/vue-image-crop-upload"}},[e._v(" vue-image-crop-upload")]),e._v(". "+e._s(e.$t("components.imageUploadTips"))+" ")]),i("pan-thumb",{attrs:{image:e.image}}),i("el-button",{staticStyle:{position:"absolute",bottom:"15px","margin-left":"40px"},attrs:{type:"primary",icon:"el-icon-upload"},on:{click:function(t){e.imagecropperShow=!0}}},[e._v(" Change Avatar ")]),i("image-cropper",{directives:[{name:"show",rawName:"v-show",value:e.imagecropperShow,expression:"imagecropperShow"}],key:e.imagecropperKey,attrs:{width:300,height:300,url:"https://httpbin.org/post","lang-type":"en"},on:{close:e.close,"crop-upload-success":e.cropSuccess}})],1)},s=[],o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"show",rawName:"v-show",value:e.value,expression:"value"}],staticClass:"vue-image-crop-upload"},[i("div",{staticClass:"vicp-wrap"},[i("div",{staticClass:"vicp-close",on:{click:e.off}},[i("i",{staticClass:"vicp-icon4"})]),i("div",{directives:[{name:"show",rawName:"v-show",value:1==e.step,expression:"step == 1"}],staticClass:"vicp-step1"},[i("div",{staticClass:"vicp-drop-area",on:{dragleave:e.preventDefault,dragover:e.preventDefault,dragenter:e.preventDefault,click:e.handleClick,drop:e.handleChange}},[i("i",{directives:[{name:"show",rawName:"v-show",value:1!=e.loading,expression:"loading != 1"}],staticClass:"vicp-icon1"},[i("i",{staticClass:"vicp-icon1-arrow"}),i("i",{staticClass:"vicp-icon1-body"}),i("i",{staticClass:"vicp-icon1-bottom"})]),i("span",{directives:[{name:"show",rawName:"v-show",value:1!==e.loading,expression:"loading !== 1"}],staticClass:"vicp-hint"},[e._v(e._s(e.lang.hint))]),i("span",{directives:[{name:"show",rawName:"v-show",value:!e.isSupported,expression:"!isSupported"}],staticClass:"vicp-no-supported-hint"},[e._v(e._s(e.lang.noSupported))]),1==e.step?i("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"fileinput",attrs:{type:"file"},on:{change:e.handleChange}}):e._e()]),i("div",{directives:[{name:"show",rawName:"v-show",value:e.hasError,expression:"hasError"}],staticClass:"vicp-error"},[i("i",{staticClass:"vicp-icon2"}),e._v(" "+e._s(e.errorMsg)+" ")]),i("div",{staticClass:"vicp-operate"},[i("a",{on:{click:e.off,mousedown:e.ripple}},[e._v(e._s(e.lang.btn.off))])])]),2==e.step?i("div",{staticClass:"vicp-step2"},[i("div",{staticClass:"vicp-crop"},[i("div",{directives:[{name:"show",rawName:"v-show",value:!0,expression:"true"}],staticClass:"vicp-crop-left"},[i("div",{staticClass:"vicp-img-container"},[i("img",{ref:"img",staticClass:"vicp-img",style:e.sourceImgStyle,attrs:{src:e.sourceImgUrl,draggable:"false"},on:{drag:e.preventDefault,dragstart:e.preventDefault,dragend:e.preventDefault,dragleave:e.preventDefault,dragover:e.preventDefault,dragenter:e.preventDefault,drop:e.preventDefault,touchstart:e.imgStartMove,touchmove:e.imgMove,touchend:e.createImg,touchcancel:e.createImg,mousedown:e.imgStartMove,mousemove:e.imgMove,mouseup:e.createImg,mouseout:e.createImg}}),i("div",{staticClass:"vicp-img-shade vicp-img-shade-1",style:e.sourceImgShadeStyle}),i("div",{staticClass:"vicp-img-shade vicp-img-shade-2",style:e.sourceImgShadeStyle})]),i("div",{staticClass:"vicp-range"},[i("input",{attrs:{type:"range",step:"1",min:"0",max:"100"},domProps:{value:e.scale.range},on:{input:e.zoomChange}}),i("i",{staticClass:"vicp-icon5",on:{mousedown:e.startZoomSub,mouseout:e.endZoomSub,mouseup:e.endZoomSub}}),i("i",{staticClass:"vicp-icon6",on:{mousedown:e.startZoomAdd,mouseout:e.endZoomAdd,mouseup:e.endZoomAdd}})]),e.noRotate?e._e():i("div",{staticClass:"vicp-rotate"},[i("i",{on:{mousedown:e.startRotateLeft,mouseout:e.endRotate,mouseup:e.endRotate}},[e._v("↺")]),i("i",{on:{mousedown:e.startRotateRight,mouseout:e.endRotate,mouseup:e.endRotate}},[e._v("↻")])])]),i("div",{directives:[{name:"show",rawName:"v-show",value:!0,expression:"true"}],staticClass:"vicp-crop-right"},[i("div",{staticClass:"vicp-preview"},[e.noSquare?e._e():i("div",{staticClass:"vicp-preview-item"},[i("img",{style:e.previewStyle,attrs:{src:e.createImgUrl}}),i("span",[e._v(e._s(e.lang.preview))])]),e.noCircle?e._e():i("div",{staticClass:"vicp-preview-item vicp-preview-item-circle"},[i("img",{style:e.previewStyle,attrs:{src:e.createImgUrl}}),i("span",[e._v(e._s(e.lang.preview))])])])])]),i("div",{staticClass:"vicp-operate"},[i("a",{on:{click:function(t){return e.setStep(1)},mousedown:e.ripple}},[e._v(e._s(e.lang.btn.back))]),i("a",{staticClass:"vicp-operate-btn",on:{click:e.prepareUpload,mousedown:e.ripple}},[e._v(e._s(e.lang.btn.save))])])]):e._e(),3==e.step?i("div",{staticClass:"vicp-step3"},[i("div",{staticClass:"vicp-upload"},[i("span",{directives:[{name:"show",rawName:"v-show",value:1===e.loading,expression:"loading === 1"}],staticClass:"vicp-loading"},[e._v(e._s(e.lang.loading))]),i("div",{staticClass:"vicp-progress-wrap"},[i("span",{directives:[{name:"show",rawName:"v-show",value:1===e.loading,expression:"loading === 1"}],staticClass:"vicp-progress",style:e.progressStyle})]),i("div",{directives:[{name:"show",rawName:"v-show",value:e.hasError,expression:"hasError"}],staticClass:"vicp-error"},[i("i",{staticClass:"vicp-icon2"}),e._v(" "+e._s(e.errorMsg)+" ")]),i("div",{directives:[{name:"show",rawName:"v-show",value:2===e.loading,expression:"loading === 2"}],staticClass:"vicp-success"},[i("i",{staticClass:"vicp-icon3"}),e._v(" "+e._s(e.lang.success)+" ")])]),i("div",{staticClass:"vicp-operate"},[i("a",{on:{click:function(t){return e.setStep(2)},mousedown:e.ripple}},[e._v(e._s(e.lang.btn.back))]),i("a",{on:{click:e.off,mousedown:e.ripple}},[e._v(e._s(e.lang.btn.close))])])]):e._e(),i("canvas",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"canvas",attrs:{width:e.width,height:e.height}})])])},r=[],n=i("53ca"),c=(i("a9e3"),i("b64b"),i("d3b7"),i("159b"),i("b775")),l={zh:{hint:"点击，或拖动图片至此处",loading:"正在上传……",noSupported:"浏览器不支持该功能，请使用IE10以上或其他现在浏览器！",success:"上传成功",fail:"图片上传失败",preview:"头像预览",btn:{off:"取消",close:"关闭",back:"上一步",save:"保存"},error:{onlyImg:"仅限图片格式",outOfSize:"单文件大小不能超过 ",lowestPx:"图片最低像素为（宽*高）："}},"zh-tw":{hint:"點擊，或拖動圖片至此處",loading:"正在上傳……",noSupported:"瀏覽器不支持該功能，請使用IE10以上或其他現代瀏覽器！",success:"上傳成功",fail:"圖片上傳失敗",preview:"頭像預覽",btn:{off:"取消",close:"關閉",back:"上一步",save:"保存"},error:{onlyImg:"僅限圖片格式",outOfSize:"單文件大小不能超過 ",lowestPx:"圖片最低像素為（寬*高）："}},en:{hint:"Click or drag the file here to upload",loading:"Uploading…",noSupported:"Browser is not supported, please use IE10+ or other browsers",success:"Upload success",fail:"Upload failed",preview:"Preview",btn:{off:"Cancel",close:"Close",back:"Back",save:"Save"},error:{onlyImg:"Image only",outOfSize:"Image exceeds size limit: ",lowestPx:"Image's size is too low. Expected at least: "}},ro:{hint:"Atinge sau trage fișierul aici",loading:"Se încarcă",noSupported:"Browser-ul tău nu suportă acest feature. Te rugăm încearcă cu alt browser.",success:"S-a încărcat cu succes",fail:"A apărut o problemă la încărcare",preview:"Previzualizează",btn:{off:"Anulează",close:"Închide",back:"Înapoi",save:"Salvează"},error:{onlyImg:"Doar imagini",outOfSize:"Imaginea depășește limita de: ",loewstPx:"Imaginea este prea mică; Minim: "}},ru:{hint:"Нажмите, или перетащите файл в это окно",loading:"Загружаю……",noSupported:"Ваш браузер не поддерживается, пожалуйста, используйте IE10 + или другие браузеры",success:"Загрузка выполнена успешно",fail:"Ошибка загрузки",preview:"Предпросмотр",btn:{off:"Отменить",close:"Закрыть",back:"Назад",save:"Сохранить"},error:{onlyImg:"Только изображения",outOfSize:"Изображение превышает предельный размер: ",lowestPx:"Минимальный размер изображения: "}},"pt-br":{hint:"Clique ou arraste o arquivo aqui para carregar",loading:"Carregando…",noSupported:"Browser não suportado, use o IE10+ ou outro browser",success:"Sucesso ao carregar imagem",fail:"Falha ao carregar imagem",preview:"Pré-visualizar",btn:{off:"Cancelar",close:"Fechar",back:"Voltar",save:"Salvar"},error:{onlyImg:"Apenas imagens",outOfSize:"A imagem excede o limite de tamanho: ",lowestPx:"O tamanho da imagem é muito pequeno. Tamanho mínimo: "}},fr:{hint:"Cliquez ou glissez le fichier ici.",loading:"Téléchargement…",noSupported:"Votre navigateur n'est pas supporté. Utilisez IE10 + ou un autre navigateur s'il vous plaît.",success:"Téléchargement réussit",fail:"Téléchargement echoué",preview:"Aperçu",btn:{off:"Annuler",close:"Fermer",back:"Retour",save:"Enregistrer"},error:{onlyImg:"Image uniquement",outOfSize:"L'image sélectionnée dépasse la taille maximum: ",lowestPx:"L'image sélectionnée est trop petite. Dimensions attendues: "}},nl:{hint:"Klik hier of sleep een afbeelding in dit vlak",loading:"Uploaden…",noSupported:"Je browser wordt helaas niet ondersteund. Gebruik IE10+ of een andere browser.",success:"Upload succesvol",fail:"Upload mislukt",preview:"Voorbeeld",btn:{off:"Annuleren",close:"Sluiten",back:"Terug",save:"Opslaan"},error:{onlyImg:"Alleen afbeeldingen",outOfSize:"De afbeelding is groter dan: ",lowestPx:"De afbeelding is te klein! Minimale afmetingen: "}},tr:{hint:"Tıkla veya yüklemek istediğini buraya sürükle",loading:"Yükleniyor…",noSupported:"Tarayıcı desteklenmiyor, lütfen IE10+ veya farklı tarayıcı kullanın",success:"Yükleme başarılı",fail:"Yüklemede hata oluştu",preview:"Önizle",btn:{off:"İptal",close:"Kapat",back:"Geri",save:"Kaydet"},error:{onlyImg:"Sadece resim",outOfSize:"Resim yükleme limitini aşıyor: ",lowestPx:"Resmin boyutu çok küçük. En az olması gereken: "}},"es-MX":{hint:"Selecciona o arrastra una imagen",loading:"Subiendo...",noSupported:"Tu navegador no es soportado, porfavor usa IE10+ u otros navegadores mas recientes",success:"Subido exitosamente",fail:"Sucedió un error",preview:"Vista previa",btn:{off:"Cancelar",close:"Cerrar",back:"Atras",save:"Guardar"},error:{onlyImg:"Unicamente imagenes",outOfSize:"La imagen excede el tamaño maximo:",lowestPx:"La imagen es demasiado pequeño. Se espera por lo menos:"}},de:{hint:"Klick hier oder zieh eine Datei hier rein zum Hochladen",loading:"Hochladen…",noSupported:"Browser wird nicht unterstützt, bitte verwende IE10+ oder andere Browser",success:"Upload erfolgreich",fail:"Upload fehlgeschlagen",preview:"Vorschau",btn:{off:"Abbrechen",close:"Schließen",back:"Zurück",save:"Speichern"},error:{onlyImg:"Nur Bilder",outOfSize:"Das Bild ist zu groß: ",lowestPx:"Das Bild ist zu klein. Mindestens: "}},ja:{hint:"クリック・ドラッグしてファイルをアップロード",loading:"アップロード中...",noSupported:"このブラウザは対応されていません。IE10+かその他の主要ブラウザをお使いください。",success:"アップロード成功",fail:"アップロード失敗",preview:"プレビュー",btn:{off:"キャンセル",close:"閉じる",back:"戻る",save:"保存"},error:{onlyImg:"画像のみ",outOfSize:"画像サイズが上限を超えています。上限: ",lowestPx:"画像が小さすぎます。最小サイズ: "}}},h={jpg:"image/jpeg",png:"image/png",gif:"image/gif",svg:"image/svg+xml",psd:"image/photoshop"},u=(i("ace4"),i("5cc6"),i("9a8c"),i("a975"),i("735e"),i("c1ac"),i("d139"),i("3a7b"),i("d5d6"),i("82f8"),i("e91f"),i("60bd"),i("5f96"),i("3280"),i("3fcc"),i("ca91"),i("25a1"),i("cd26"),i("3c5d"),i("2954"),i("649e"),i("219c"),i("170b"),i("b39a"),i("72f7"),function(e,t){e=e.split(",")[1],e=window.atob(e);for(var i=new Uint8Array(e.length),a=0;a<e.length;a++)i[a]=e.charCodeAt(a);return new Blob([i],{type:t})}),p=function(e,t){var i=Object.assign({ele:e.target,type:"hit",bgc:"rgba(0, 0, 0, 0.15)"},t),a=i.ele;if(a){var s=a.getBoundingClientRect(),o=a.querySelector(".e-ripple");switch(o?o.className="e-ripple":(o=document.createElement("span"),o.className="e-ripple",o.style.height=o.style.width=Math.max(s.width,s.height)+"px",a.appendChild(o)),i.type){case"center":o.style.top=s.height/2-o.offsetHeight/2+"px",o.style.left=s.width/2-o.offsetWidth/2+"px";break;default:o.style.top=e.pageY-s.top-o.offsetHeight/2-document.body.scrollTop+"px",o.style.left=e.pageX-s.left-o.offsetWidth/2-document.body.scrollLeft+"px"}return o.style.backgroundColor=i.bgc,o.className="e-ripple z-active",!1}},d={props:{field:{type:String,default:"avatar"},ki:{type:Number,default:0},value:{type:Boolean,default:!0},url:{type:String,default:""},params:{type:Object,default:null},headers:{type:Object,default:null},width:{type:Number,default:200},height:{type:Number,default:200},noRotate:{type:Boolean,default:!0},noCircle:{type:Boolean,default:!1},noSquare:{type:Boolean,default:!1},maxSize:{type:Number,default:10240},langType:{type:String,default:"zh"},langExt:{type:Object,default:null},imgFormat:{type:String,default:"png"},withCredentials:{type:Boolean,default:!1}},data:function(){var e=this.imgFormat,t=this.langType,i=this.langExt,a=this.width,s=this.height,o=!0,r=["jpg","png"],n=-1===r.indexOf(e)?"jpg":e,c=l[t]?l[t]:l["en"],u=h[n];return this.imgFormat=n,i&&Object.assign(c,i),"function"!==typeof FormData&&(o=!1),{mime:u,lang:c,isSupported:o,isSupportTouch:document.hasOwnProperty("ontouchstart"),step:1,loading:0,progress:0,hasError:!1,errorMsg:"",ratio:a/s,sourceImg:null,sourceImgUrl:"",createImgUrl:"",sourceImgMouseDown:{on:!1,mX:0,mY:0,x:0,y:0},previewContainer:{width:100,height:100},sourceImgContainer:{width:240,height:184},scale:{zoomAddOn:!1,zoomSubOn:!1,range:1,rotateLeft:!1,rotateRight:!1,degree:0,x:0,y:0,width:0,height:0,maxWidth:0,maxHeight:0,minWidth:0,minHeight:0,naturalWidth:0,naturalHeight:0}}},computed:{progressStyle:function(){var e=this.progress;return{width:e+"%"}},sourceImgStyle:function(){var e=this.scale,t=this.sourceImgMasking,i=e.y+t.y+"px",a=e.x+t.x+"px";return{top:i,left:a,width:e.width+"px",height:e.height+"px",transform:"rotate("+e.degree+"deg)","-ms-transform":"rotate("+e.degree+"deg)","-moz-transform":"rotate("+e.degree+"deg)","-webkit-transform":"rotate("+e.degree+"deg)","-o-transform":"rotate("+e.degree+"deg)"}},sourceImgMasking:function(){var e=this.width,t=this.height,i=this.ratio,a=this.sourceImgContainer,s=a,o=s.width/s.height,r=0,n=0,c=s.width,l=s.height,h=1;return i<o&&(h=s.height/t,c=s.height*i,r=(s.width-c)/2),i>o&&(h=s.width/e,l=s.width/i,n=(s.height-l)/2),{scale:h,x:r,y:n,width:c,height:l}},sourceImgShadeStyle:function(){var e=this.sourceImgMasking,t=this.sourceImgContainer,i=t,a=e,s=a.width===i.width?a.width:(i.width-a.width)/2,o=a.height===i.height?a.height:(i.height-a.height)/2;return{width:s+"px",height:o+"px"}},previewStyle:function(){var e=this.ratio,t=this.previewContainer,i=t,a=i.width,s=i.height,o=a/s;return e<o&&(a=i.height*e),e>o&&(s=i.width/e),{width:a+"px",height:s+"px"}}},watch:{value:function(e){e&&1!==this.loading&&this.reset()}},created:function(){document.addEventListener("keyup",this.closeHandler)},destroyed:function(){document.removeEventListener("keyup",this.closeHandler)},methods:{ripple:function(e){p(e)},off:function(){var e=this;setTimeout((function(){e.$emit("input",!1),e.$emit("close"),3===e.step&&2===e.loading&&e.setStep(1)}),200)},setStep:function(e){var t=this;setTimeout((function(){t.step=e}),200)},preventDefault:function(e){return e.preventDefault(),!1},handleClick:function(e){1!==this.loading&&e.target!==this.$refs.fileinput&&(e.preventDefault(),document.activeElement!==this.$refs&&this.$refs.fileinput.click())},handleChange:function(e){if(e.preventDefault(),1!==this.loading){var t=e.target.files||e.dataTransfer.files;this.reset(),this.checkFile(t[0])&&this.setSourceImg(t[0])}},checkFile:function(e){var t=this.lang,i=this.maxSize;return-1===e.type.indexOf("image")?(this.hasError=!0,this.errorMsg=t.error.onlyImg,!1):!(e.size/1024>i)||(this.hasError=!0,this.errorMsg=t.error.outOfSize+i+"kb",!1)},reset:function(){this.loading=0,this.hasError=!1,this.errorMsg="",this.progress=0},setSourceImg:function(e){var t=this,i=new FileReader;i.onload=function(e){t.sourceImgUrl=i.result,t.startCrop()},i.readAsDataURL(e)},startCrop:function(){var e=this,t=this.width,i=this.height,a=this.ratio,s=this.scale,o=this.sourceImgUrl,r=this.sourceImgMasking,n=this.lang,c=r,l=new Image;l.src=o,l.onload=function(){var o=l.naturalWidth,r=l.naturalHeight,h=o/r,u=c.width,p=c.height,d=0,g=0;if(o<t||r<i)return e.hasError=!0,e.errorMsg=n.error.lowestPx+t+"*"+i,!1;a>h&&(p=u/h,g=(c.height-p)/2),a<h&&(u=p*h,d=(c.width-u)/2),s.range=0,s.x=d,s.y=g,s.width=u,s.height=p,s.degree=0,s.minWidth=u,s.minHeight=p,s.maxWidth=o*c.scale,s.maxHeight=r*c.scale,s.naturalWidth=o,s.naturalHeight=r,e.sourceImg=l,e.createImg(),e.setStep(2)}},imgStartMove:function(e){if(e.preventDefault(),this.isSupportTouch&&!e.targetTouches)return!1;var t=e.targetTouches?e.targetTouches[0]:e,i=this.sourceImgMouseDown,a=this.scale,s=i;s.mX=t.screenX,s.mY=t.screenY,s.x=a.x,s.y=a.y,s.on=!0},imgMove:function(e){if(e.preventDefault(),this.isSupportTouch&&!e.targetTouches)return!1;var t=e.targetTouches?e.targetTouches[0]:e,i=this.sourceImgMouseDown,a=i.on,s=i.mX,o=i.mY,r=i.x,n=i.y,c=this.scale,l=this.sourceImgMasking,h=l,u=t.screenX,p=t.screenY,d=u-s,g=p-o,m=r+d,v=n+g;a&&(m>0&&(m=0),v>0&&(v=0),m<h.width-c.width&&(m=h.width-c.width),v<h.height-c.height&&(v=h.height-c.height),c.x=m,c.y=v)},startRotateRight:function(e){var t=this,i=this.scale;i.rotateRight=!0;var a=function e(){if(i.rotateRight){var a=++i.degree;t.createImg(a),setTimeout((function(){e()}),60)}};a()},startRotateLeft:function(e){var t=this,i=this.scale;i.rotateLeft=!0;var a=function e(){if(i.rotateLeft){var a=--i.degree;t.createImg(a),setTimeout((function(){e()}),60)}};a()},endRotate:function(){var e=this.scale;e.rotateLeft=!1,e.rotateRight=!1},startZoomAdd:function(e){var t=this,i=this.scale;i.zoomAddOn=!0;var a=function e(){if(i.zoomAddOn){var a=i.range>=100?100:++i.range;t.zoomImg(a),setTimeout((function(){e()}),60)}};a()},endZoomAdd:function(e){this.scale.zoomAddOn=!1},startZoomSub:function(e){var t=this,i=this.scale;i.zoomSubOn=!0;var a=function e(){if(i.zoomSubOn){var a=i.range<=0?0:--i.range;t.zoomImg(a),setTimeout((function(){e()}),60)}};a()},endZoomSub:function(e){var t=this.scale;t.zoomSubOn=!1},zoomChange:function(e){this.zoomImg(e.target.value)},zoomImg:function(e){var t=this,i=this.sourceImgMasking,a=this.scale,s=a.maxWidth,o=a.maxHeight,r=a.minWidth,n=a.minHeight,c=a.width,l=a.height,h=a.x,u=a.y,p=i,d=p.width,g=p.height,m=r+(s-r)*e/100,v=n+(o-n)*e/100,f=d/2-m/c*(d/2-h),w=g/2-v/l*(g/2-u);f>0&&(f=0),w>0&&(w=0),f<d-m&&(f=d-m),w<g-v&&(w=g-v),a.x=f,a.y=w,a.width=m,a.height=v,a.range=e,setTimeout((function(){a.range===e&&t.createImg()}),300)},createImg:function(e){var t=this.mime,i=this.sourceImg,a=this.scale,s=a.x,o=a.y,r=a.width,n=a.height,c=a.degree,l=this.sourceImgMasking.scale,h=this.$refs.canvas,u=h.getContext("2d");e&&(this.sourceImgMouseDown.on=!1),h.width=this.width,h.height=this.height,u.clearRect(0,0,this.width,this.height),u.fillStyle="#fff",u.fillRect(0,0,this.width,this.height),u.translate(.5*this.width,.5*this.height),u.rotate(Math.PI*c/180),u.translate(.5*-this.width,.5*-this.height),u.drawImage(i,s/l,o/l,r/l,n/l),this.createImgUrl=h.toDataURL(t)},prepareUpload:function(){var e=this.url,t=this.createImgUrl,i=this.field,a=this.ki;this.$emit("crop-success",t,i,a),"string"===typeof e&&e?this.upload():this.off()},upload:function(){var e=this,t=this.lang,i=this.imgFormat,a=this.mime,s=this.url,o=this.params,r=this.field,l=this.ki,h=this.createImgUrl,p=new FormData;p.append(r,u(h,a),r+"."+i),"object"===Object(n["a"])(o)&&o&&Object.keys(o).forEach((function(e){p.append(e,o[e])})),this.reset(),this.loading=1,this.setStep(3),Object(c["a"])({url:s,method:"post",data:p}).then((function(t){e.loading=2,e.$emit("crop-upload-success",t.data)})).catch((function(i){e.value&&(e.loading=3,e.hasError=!0,e.errorMsg=t.fail,e.$emit("crop-upload-fail",i,r,l))}))},closeHandler:function(e){!this.value||"Escape"!==e.key&&27!==e.keyCode||this.off()}}},g=d,m=(i("6a3f"),i("2877")),v=Object(m["a"])(g,o,r,!1,null,null,null),f=v.exports,w=i("3cbc"),b={name:"AvatarUploadDemo",components:{ImageCropper:f,PanThumb:w["a"]},data:function(){return{imagecropperShow:!1,imagecropperKey:0,image:"https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191"}},methods:{cropSuccess:function(e){this.imagecropperShow=!1,this.imagecropperKey=this.imagecropperKey+1,this.image=e.files.avatar},close:function(){this.imagecropperShow=!1}}},y=b,S=(i("09ca"),Object(m["a"])(y,a,s,!1,null,"22326c84",null));t["default"]=S.exports},d7ff:function(e,t,i){}}]);