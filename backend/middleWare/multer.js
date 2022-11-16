
import multer from 'multer';
import path from 'path';
import { nextTick } from 'process';


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./PRODUCT_FILES");
    },
    filename: function (req, file, callback) {
        const index = file.originalname.lastIndexOf('.');
        const name = file.originalname.slice(0, index).replaceAll(/\s/g,'')
        callback(null,   name + '-' + Date.now() + path.extname(file.originalname));

    }
    
});

export default multer({ storage: storage });
