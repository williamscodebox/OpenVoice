import pyaudio

p = pyaudio.PyAudio()

for i in range(p.get_host_api_count()):
    print(i, p.get_host_api_info_by_index(i))
