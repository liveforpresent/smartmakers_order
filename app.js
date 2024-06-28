import express from 'express'
import body_parser from 'body-parser'
import helmet from 'helmet';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createConnection } from 'mysql2';
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

function dbconfig(){
    const conInfo = {
        host: process.env.RDS_HOSTNAME,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE,
        port: process.env.RDS_PORT
    }
    const connection = createConnection(conInfo);
    
    return connection;
}

function sendToServer(values){

    const sql = "INSERT INTO orders VALUES(now(), ?, ?, ?, ?, ?, ?, ?, ?, false);"
    const connection = dbconfig();

    connection.query(
        sql, values, (err) => {
            if (err){
                console.log(err);
            }
        }
    );

    return connection.connect();
}

// main
app.get('/', (req, res) => {
    res.sendFile("/index.html");  
});

// 문의 버튼

app.post('/submit', async (req, res) => {
    const buyer = req.body.buyer;
    const phone = req.body.phone;
    const neonType = req.body.neon_type;
    const neonWidth = req.body.neon_width;
    const neonHeight = req.body.neon_height;
    const neonContent = req.body.neon_content;
    const reqContents = req.body.req_contents;
    const construction = req.body.construction;
    const values = [buyer, phone, neonType, neonWidth, neonHeight, neonContent, reqContents, construction];

    if (buyer === "" || phone === "" || neonType === "" || neonWidth === "" || neonHeight === "" || neonContent === "" || reqContents === "" || construction === ""){
        return;
    }else{
        console.log('success sending');
        sendToServer(values);
        res.redirect('/submit.html');
    }

});

app.listen(port, () => {
    console.log("server running in port");
});
