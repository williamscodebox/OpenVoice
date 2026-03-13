import sounddevice as sd
import numpy as np

print("Listening...")
audio = sd.rec(
    int(16000 * 1),  # 1 second
    samplerate=16000,
    channels=1,
    dtype='int16'
)
sd.wait()

print("Captured:", audio.shape)
