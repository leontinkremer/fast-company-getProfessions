export default function createUniqueID() {
    let dt = new Date().getTime();
    const uniqueID = "xxxxxxxx-xxxxxxxx-4xxxxxxx-xxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
    );
    return uniqueID;
}
