from openvoice.api import BaseSpeakerTTS, ToneColorConverter
import torchaudio

ckpt_base = "checkpoints/base_speakers/EN/config.json"
ckpt_converter = "checkpoints/converter/config.json"

base_speaker_tts = BaseSpeakerTTS(ckpt_base)
converter = ToneColorConverter(ckpt_converter)
print(base_speaker_tts.hps.speakers)


# 1. Load reference voice
ref_audio, sr = torchaudio.load("example_reference.mp3")

# 2. Generate base speech
base_audio_path = "output_base.wav"
base_speaker_tts.tts(
    text="Hello, this is a test.",
    speaker="default",
    output_path=base_audio_path
)
base_speaker_tts.tts(
    text="Hello, this is a test.",
    speaker="cheerful",
    output_path="out.wav"
)


# 3. Convert to target voice
# output_path = "output_final.wav"
# converter.convert(
#     base_audio_path,
#     ref_audio,
#     output_path
# )
