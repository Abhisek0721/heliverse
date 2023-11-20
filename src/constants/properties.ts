interface Iproperties {
    SERVER_URL: string;
}

const properties:Iproperties = {
    SERVER_URL: import.meta.env.VITE_SERVER_URL || "http://localhost:3000"
}

export default properties;