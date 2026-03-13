import pyaudio

p = pyaudio.PyAudio()

for i in range(p.get_device_count()):
    info = p.get_device_info_by_index(i)
    print(
        f"Index {i}: {info['name']} | "
        f"Inputs: {info['maxInputChannels']} | "
        f"Host API: {p.get_host_api_info_by_index(info['hostApi'])['name']}"
    )
