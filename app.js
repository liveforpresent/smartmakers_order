import express from 'express'
import body_parser from 'body-parser'
import helmet from 'helmet';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { connection } from './db.js';
import { config } from 'dotenv';

const app = express();
config();
const port = process.env.PORT;

// 보안
app.use(helmet());

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(join(__dirname, "template")));

// body-parser
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended : false}));


// main
app.get('/', (req, res) => {
    res.sendFile("/index.html");  
});

function sendToServer(values, connection){

    const sql = "INSERT INTO orders VALUES(now(), ?, ?, ?, ?, ?, ?, ?, ?, ?, false);"

    connection.query(
        sql, values, (err) => {
            if (err){
                console.log(err);
            }
        }
    );
}


// app request
app.get('/items', (req, res) => {
    connection.query(`SELECT DATE_FORMAT(upload_time, "%m-%d  %H:%i") AS upload_time, buyer, phone FROM orders`, (error, results) => {
        if(error) throw error;
        console.log("Query results:", results);
        res.json(results);
    });
});

// 문의 버튼

app.post('/submit', async (req, res) => {
    const buyer = req.body.buyer;
    const phone = req.body.phone;
    const neonType = req.body.neon_type;
    const neonWidth = req.body.neon_width;
    const neonHeight = req.body.neon_height;
    const neonContent = req.body.neon_content;
    const neonColor = req.body.neon_color;
    const reqContents = req.body.req_contents;
    const construction = req.body.construction;
    const values = [buyer, phone, neonType, neonWidth, neonHeight, neonContent, neonColor, reqContents, construction];

    if (buyer === "" || phone === "" || neonType === "" || neonWidth === "" || neonHeight === "" || neonContent === "" || neonColor === "" || reqContents === "" || construction === ""){
        return;
    }else{
        console.log('success sending');
        sendToServer(values, connection);
        res.redirect('/submit.html');
    }

});

app.listen(port, () => {
    console.log(`server running in port ${port}`);
});
