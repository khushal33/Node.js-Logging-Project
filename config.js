var path = require("path");
module.exports={
	mediaPath:'/media',
	basePath:__dirname,
	mediaFolder:path.join(__dirname,'public'),
	logsFolder:path.join(__dirname,'logs/'),
	default_404:'/default-image/404.jpg',
	default_500:'/default-image/500.jpg',
	imageDtl:{
		folder:'/new-media',
		folderimg:'/default-image/folder.png'
	}
}