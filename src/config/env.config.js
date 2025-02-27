module.exports = {
    "port": 3000,
    "appEndpoint": "http://localhost:3600",
    "apiEndpoint": "http://localhost:3600",
    "jwt_secret": "bear-family-2020",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "permissionLevels": {
        "VIEWER": 1,
        "NORMAL": 4,
        "ADMIN": 2048
    }
};
