import sys
import os
from fastapi import FastAPI, UploadFile, File, Response
from fastapi.middleware.cors import CORSMiddleware
import io
# Add parent folder to Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..", "OpenVoice")))

import newtest   # now this works!

app = FastAPI()

# Allow React to talk to Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/hello")
def hello():
    return {"message": "Hello from Python!"}

@app.get("/api/run")
def run_script():
    return {"result": newtest.make_voice()}

@app.post("/process-audio")
async def process_audio(file: UploadFile = File(...)):
    input_bytes = await file.read()
    input_buffer = io.BytesIO(input_bytes)

    # TODO: your OpenVoice processing here
    # processed_bytes = openvoice.process(input_buffer)

    processed_bytes = input_bytes  # echo for now

    return Response(content=processed_bytes, media_type="audio/mpeg")

# to run this server in terminal
# go to folder main is in and run
#  uvicorn main:app --reload
