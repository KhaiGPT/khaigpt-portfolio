from fastapi import FastAPI

app = FastAPI(title="khai-site")


@app.get("/api/health")
def health():
    return {"ok": True}
