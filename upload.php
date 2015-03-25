<?php
	$new_image_name = "teste.jpg";
	move_uploaded_file($_FILES["file"]["tmp_name"], "C:/".$new_image_name);
?>