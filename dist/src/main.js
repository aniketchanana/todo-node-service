"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("./constants/routes");
const server_1 = __importDefault(require("./server"));
const routes_2 = __importDefault(require("./modules/user/routes"));
const auth_1 = require("./middlewares/auth");
const routes_3 = __importDefault(require("./modules/todo/routes"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * Middlewares
     */
    const authMiddleWare = (0, auth_1.getAuthMiddleWare)();
    /**
     * Initiating top level app routes
     */
    const userRoutes = (0, routes_2.default)(authMiddleWare);
    const todoRoutes = (0, routes_3.default)();
    /**
     * Registering routes to listen incoming request
     */
    server_1.default.set("trust proxy", 1);
    server_1.default.use(routes_1.userEndpoints.root, userRoutes);
    server_1.default.use(routes_1.todoEndpoints.root, authMiddleWare, todoRoutes);
    server_1.default.use("/testAuth", authMiddleWare, (_, res) => {
        return res.status(200).send("Authenticated");
    });
    server_1.default.get("/ping", (req, res) => {
        return res.json({ status: "alive" });
    });
    /**
     * Server
     */
    const PORT = process.env.PORT;
    server_1.default.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}))();
//# sourceMappingURL=main.js.map