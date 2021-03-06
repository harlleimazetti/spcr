///////// IMG EDITOR INÍCIO

window.addEventListener('resize', resizeImgEditor, false);
window.addEventListener('orientationchange', resizeImgEditor, false);

var canvasImgEditorID;// = '#img_editor_canvas';
var canvasImgEditorDIV = '#img_editor_canvas_div';
var canvasImgEditor;
var ctxImgEditor;
var imgWidth;
var imgHeight;

function imgEditor() {

}
imgEditor.prototype.limpa = function() {
	ctxImgEditor.clearRect(0, 0, canvasImgEditor.width, canvasImgEditor.height);	
}
imgEditor.prototype.carregaImagem = function(img_src) {
	canvasID = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
	canvasImgEditorID = '#' + canvasID;
	$(canvasImgEditorDIV).html('<canvas id="' + canvasID + '" class="img-editor-canvas" width="500" height="375"></canvas>');
	//$(canvasImgEditorID).removeAttr("data-caman-id");
	canvasImgEditor = document.getElementById(canvasID);
	ctxImgEditor = canvasImgEditor.getContext('2d');
	Caman(canvasImgEditorID, function() {
		this.render();
		var im_tmp = new Image();
		im_tmp.onload = function() {
			var newWidth = window.innerWidth * 0.7;
			var canvasPercent = newWidth / this.width;
			var newHeight = this.height * canvasPercent;
			imgWidth = 500;//newWidth;
			imgHeight = 375;//newHeight;
			canvasImgEditor.width = 500;//newWidth;
			canvasImgEditor.height = 375;//newHeight;
			//console.log('Width: ' + this.width + ', Height: ' + this.height);
			var ratio = calcRatio(imgWidth,imgHeight,canvasImgEditor.width,canvasImgEditor.height);
			//console.log('Ratio: ' + ratio);
			//console.log('imgWidth: ' + imgWidth);
			//console.log('imgHeight: ' + imgHeight);
			//console.log('imgWidth * ratio: ' + (imgWidth * ratio));
			//console.log('imgHeight * ratio: ' + (imgHeight * ratio));
    	    ctxImgEditor.drawImage(im_tmp, 0, 0, imgWidth*ratio,imgHeight*ratio);
			//resizeImgEditor();
			//$(canvasImgEditorID).attr("data-caman-id", canvasID);
		}
		im_tmp.src = img_src;
	});
	/*
	$(canvasImgEditorID).removeAttr("data-caman-id");
	var im_tmp = new Image();
	im_tmp.onload = function() {
		imgWidth = 320;
		imgHeight = 240;
		canvasImgEditor.width = 320;
		canvasImgEditor.height = 240;
		//console.log('Width: ' + this.width + ', Height: ' + this.height);
		var ratio = calcRatio(imgWidth,imgHeight,canvasImgEditor.width,canvasImgEditor.height);
		//console.log('Ratio: ' + ratio);
        ctxImgEditor.drawImage(im_tmp, 0, 0, imgWidth*ratio,imgHeight*ratio);
		//ctxImgEditor.drawImage(im_tmp, 0, 0, 320, 240);
		//resizeImgEditor();
		$(canvasImgEditorID).attr("data-caman-id", "1");
	}
	im_tmp.src = img_src;
	*/
}
imgEditor.prototype.rotateRight = function() {
	Caman(canvasImgEditorID, function() {
		this.rotate(90);
		this.render();
	});
}
imgEditor.prototype.rotateLeft = function() {
	Caman(canvasImgEditorID, function() {
		this.rotate(-90);
		this.render();
	});
}
imgEditor.prototype.resize = function(width, height) {
	Caman(canvasImgEditorID, function() {
		this.resize({width: width, height: height});
		this.render();
	});
}
imgEditor.prototype.gray = function() {
	Caman(canvasImgEditorID, function() {
		this.greyscale();
		this.render();
	});
}
imgEditor.prototype.brightness = function(val) {
	Caman(canvasImgEditorID, function() {
		this.brightness(val);
		this.render();
	});
}
imgEditor.prototype.contrast = function(val) {
	Caman(canvasImgEditorID, function() {
		this.contrast(val);
		this.render();
	});
}
imgEditor.prototype.threshold = function(val) {
	Caman(canvasImgEditorID, function() {
		this.threshold(val);
		this.render();
	});
}
imgEditor.prototype.blur = function() {
	Caman(canvasImgEditorID, function() {
		this.boxBlur();
		this.render();
	});
}
imgEditor.prototype.edges = function() {
	Caman(canvasImgEditorID, function() {
		this.edgeDetect();
		this.render();
	});
}
imgEditor.prototype.revert = function() {
	Caman(canvasImgEditorID, function() {
		this.revert();
		this.render();
	});
}
imgEditor.prototype.corners = function() {
	im_tmp = new Image();
	im_tmp.onload = function() {
       	var width = this.width;
       	var height = this.height;
		//ctxImgEditor.drawImage(im_tmp, 0, 0, width, height);
		var imageData = ctxImgEditor.getImageData(0, 0, width, height);
		var im = new jsfeat.matrix_t(width, height, jsfeat.U8_t | jsfeat.C1_t);
		jsfeat.imgproc.grayscale(imageData.data, width, height, im);
		jsfeat.imgproc.box_blur_gray(im, im, 4, 0);
		
		// render result back to canvas
		var data_u32 = new Uint32Array(imageData.data.buffer);
		var alpha = (0xff << 24);
		var i = im.cols*im.rows, pix = 0;
		while(--i >= 0) {
			pix = im.data[i];
			data_u32[i] = alpha | (pix << 16) | (pix << 8) | pix;
		}
		ctxImgEditor.putImageData(imageData, 0, 0);

		var corners = [],
			laplacian_threshold = 50,
			min_eigen_value_threshold = 80;

		// choose threshold values
		jsfeat.yape06.laplacian_threshold = laplacian_threshold;
		jsfeat.yape06.min_eigen_value_threshold = min_eigen_value_threshold;
 
		// you should use preallocated keypoint_t array
		for (var i = 0; i < im.cols*im.rows; ++i) {
			corners[i] = new jsfeat.keypoint_t(0,0,0,0);
		}
					
		// perform detection
		// returns the amount of detected corners
		var count = jsfeat.yape06.detect(im, corners, border = 1);
		//console.log(count);
		//console.log(corners);
			
		// render result back to canvas
		var data_u32 = new Uint32Array(imageData.data.buffer);
		render_corners(corners, count, data_u32, width);
		ctxImgEditor.putImageData(imageData, 0, 0);
		
		function render_corners(corners, count, img, step) {
			var pix = (0xff << 24) | (0x00 << 16) | (0xff << 8) | 0x00;
			for(var i=0; i < count; ++i)
			{
				//console.log('Ponto ' + i + ': ' + 'X: ' + corners[i].x + ', Y: ' + corners[i].y);
				var x = corners[i].x;
				var y = corners[i].y;
				var off = (x + y * step);
				img[off] = pix;
				img[off-1] = pix;
				img[off+1] = pix;
				img[off-step] = pix;
				img[off+step] = pix;
			}
		}
	
		function getCantosQuadro1() {
			var canto = {'a':0, 'b':1, 'c':count - 1, 'd':count - 2};
			return canto;
		}
		
		function getCantosQuadro2() {
			var canto = {'a':2, 'b':3, 'c':count - 3, 'd':count - 4};
			return canto;
		}
		
		var topLeft, topRight, bottomLeft, bottomRight;
		var canto = getCantosQuadro2();
		identificarCantos(a = canto.a, b = canto.b, c = canto.c, d = canto.d);
		
		function identificarCantos() {
			if (corners[a].x > corners[b].x) {
				topLeft = {'x':corners[b].x, 'y':corners[b].y};
				topRight = {'x':corners[a].x, 'y':corners[a].y};
			} else {
				topLeft = {'x':corners[a].x, 'y':corners[a].y};
				topRight = {'x':corners[b].x, 'y':corners[b].y};
			}
			if (corners[c].x < corners[d].x) {
				bottomLeft = {'x':corners[c].x, 'y':corners[c].y};
				bottomRight = {'x':corners[d].x, 'y':corners[d].y};
			} else {
				bottomLeft = {'x':corners[d].x, 'y':corners[d].y};
				bottomRight = {'x':corners[c].x, 'y':corners[c].y};
			}
		}
			
		//console.log('Coordenadas antes do ajuste');
		//console.log(topLeft);
		//console.log(topRight);
		//console.log(bottomLeft);
		//console.log(bottomRight);
		
		function recortarFora(topLeft, topRight, bottomLeft, bottomRight) {
			if (topLeft.y < topRight.y) {
				topRight.y = topLeft.y;
			} else {
				topLeft.y = topRight.y;
			}
			
			if (topLeft.x < bottomLeft.x) {
				bottomLeft.x = topLeft.x;	
			} else {
				topLeft.x = bottomLeft.x;
			}
			
			if (topRight.x < bottomRight.x) {
				topRight.x = bottomRight.x;	
			} else {
				bottomRight.x = topRight.x;
			}

			if (bottomLeft.y < bottomRight.y) {
				bottomLeft.y = bottomRight.y;
			} else {
				bottomRight.y = bottomLeft.y;
			}
			recortar();
		}
			
		function recortarDentro(topLeft, topRight, bottomLeft, bottomRight) {
			if (topLeft.y < topRight.y) {
				topLeft.y = topRight.y;
			} else {
				topRight.y = topLeft.y;
			}
			
			if (topLeft.x < bottomLeft.x) {
				topLeft.x = bottomLeft.x;	
			} else {
				bottomLeft.x = topLeft.x;
			}
			
			if (topRight.x < bottomRight.x) {
				bottomRight.x = topRight.x;	
			} else {
				topRight.x = bottomRight.x;
			}

			if (bottomLeft.y < bottomRight.y) {
				bottomRight.y = bottomLeft.y;
			} else {
				bottomLeft.y = bottomRight.y;
			}
			recortar();
		}
			
		function recortar() {
			Caman(canvasImgEditorID, function () {
				// width, height, x, y
				this.crop(q1Width, q1Height, topLeft.x, topLeft.y);
				this.render();
			});
		}

/*
		// Ajusta para as proporções da imagem original antes de recortar
		percent = canvasImgEditor.width * 100 / 320;
		//console.log('Imagem Original: ' + canvasImgEditor.width);
		//console.log('Percentual: ' + percent);
		
		topLeft.x = topLeft.x * (percent / 100);
		topLeft.y = topLeft.y * (percent / 100);
		topRight.x = topRight.x * (percent / 100);
		topRight.y = topRight.y * (percent / 100);
		bottomLeft.x = bottomLeft.x * (percent / 100);
		bottomLeft.y = bottomLeft.y * (percent / 100);
		bottomRight.x = bottomRight.x * (percent / 100);
		bottomRight.y = bottomRight.y * (percent / 100);
*/		
		var q1Width = topRight.x - topLeft.x;
		var q1Height = bottomLeft.y - topLeft.y;
	
		//recortarFora(topLeft, topRight, bottomLeft, bottomRight);
		//recortarDentro(topLeft, topRight, bottomLeft, bottomRight);
			
		console.log('Coordenadas depois do ajuste (INSIDE)');
		console.log(topLeft);
		console.log(topRight);
		console.log(bottomLeft);
		console.log(bottomRight);
		
		var co = 180 / Math.PI;
		var dx = topLeft.x - topRight.x;
		var dy = topLeft.y - topRight.y;
		var angulo = Math.atan2(dy, dx) * co;
		
		//console.log('Angulo');
		//console.log(angulo);
	}
	im_tmp.src = sessionStorage.img_src;
}

function calcRatio(srcWidth, srcHeight, maxWidth, maxHeight) {
	return(Math.min(maxWidth / srcWidth, maxHeight / srcHeight));
}

var editor = new imgEditor();

$(document).on('pagebeforeshow', '#img_editor', function()
{
	//canvasImgEditor = document.getElementById('img_editor_canvas');
	//ctxImgEditor = canvasImgEditor.getContext('2d');
	editor.carregaImagem(sessionStorage.img_src);
});

$(document).on('pageshow', '#img_editor', function()
{
	//canvasImgEditor = document.getElementById('img_editor_canvas');
	//ctxImgEditor = canvasImgEditor.getContext('2d');
	//editor.carregaImagem(sessionStorage.img_src);
});

$(document).on('click', '#img_editor #imgEditorBtnRotateRight', function()
{
	//editor.resize(canvasImgEditor.height, canvasImgEditor.width);
	editor.rotateRight();
});

$(document).on('click', '#img_editor #imgEditorBtnRotateLeft', function()
{
	//editor.resize(canvasImgEditor.height, canvasImgEditor.width);
	editor.rotateLeft();
});
$(document).on('click', '#img_editor #imgEditorBtnFindCorners', function()
{
	editor.corners();
});
$(document).on('click', '#img_editor #imgEditorBtnGray', function()
{
	editor.gray();
});
$(document).on('click', '#img_editor #imgEditorBtnCrop', function()
{
	alert('Iniciar Edição');
	Caman(canvasImgEditorID, function() {
		this.render();
	});
});
$(document).on('click', '#img_editor #imgEditorBtnBlur', function()
{
	editor.blur();
});
$(document).on('click', '#img_editor #imgEditorBtnEdges', function()
{
	editor.edges();
});
$(document).on('click', '#img_editor #imgEditorBtnRevert', function()
{
	editor.revert();
});
$(document).on('slidestop', '#imgEditorBrightness', function() {
	editor.brightness($(this).val());
});
$(document).on('slidestop', '#imgEditorContrast', function() {
	editor.contrast($(this).val());
});
$(document).on('slidestop', '#imgEditorThreshold', function() {
	editor.threshold($(this).val());
});

function resizeImgEditor() {
	/*
	var marginWidth = 0.00;
	var canvasPercent = 1 - (marginWidth * 2);
	//console.log('Margin Width: ' + marginWidth);
	//console.log('Canvas Percent: ' + canvasPercent);
	var newWidth = window.innerWidth;
	var newHeight = window.innerHeight;
	//console.log('Width: ' + newWidth + ' - Height: ' + newHeight);
	var margin = newWidth * marginWidth;
	//console.log('Margem: ' + margin);
	var newCanvasWidth = newWidth * canvasPercent;
	//console.log('Nova Canvas Width: ' + newCanvasWidth);
	//console.log('Canvas Width: ' + canvasImgEditor.width);
	var newCanvasScale = newCanvasWidth / (canvasImgEditor.width);
	//console.log('Nova Canvas Scale: ' + newCanvasScale);
	/*$(canvasImgEditorID).css({
		'-webkit-transform' : 'scale(' + newCanvasScale + ', ' + newCanvasScale + ')',
		'-moz-transform'    : 'scale(' + newCanvasScale + ', ' + newCanvasScale + ')',
		'-ms-transform'     : 'scale(' + newCanvasScale + ', ' + newCanvasScale + ')',
		'-o-transform'      : 'scale(' + newCanvasScale + ', ' + newCanvasScale + ')',
		'transform'         : 'scale(' + newCanvasScale + ', ' + newCanvasScale + ')'
	});
	*/
	var newWidth = window.innerWidth;
	var canvasPercent = newWidth / imgWidth;
	var newHeight = imgHeight * canvasPercent;
	var im_tmp = new Image();
	im_tmp.onload = function() {
		imgWidth = newWidth;
		imgHeight = newHeight;
		canvasImgEditor.width = newWidth;
		canvasImgEditor.height = newHeight;
		var ratio = calcRatio(imgWidth,imgHeight,canvasImgEditor.width,canvasImgEditor.height);
		ctxImgEditor.drawImage(im_tmp, 0, 0, imgWidth*ratio,imgHeight*ratio);
		//console.log('Ratio: ' + ratio);
		//console.log('imgWidth: ' + imgWidth);
		//console.log('imgHeight: ' + imgHeight);
		//console.log('imgWidth * ratio: ' + (imgWidth * ratio));
		//console.log('imgHeight * ratio: ' + (imgHeight * ratio));
	}
	im_tmp.src = sessionStorage.img_src;
}

///////// IMG EDITOR FIM