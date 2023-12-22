import app from "./app";
import { sequelize } from "./db/db";

const port = 3000

sequelize.sync({force: false}).then(async () => {
    app.listen(port, () => {
        console.log(`server on PORT${port}`);
    })
})