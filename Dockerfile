FROM docker

# Version Variables
ENV ANDROID_SDK_TOOLS 6514223
ENV ANDROID_COMPILE_SDK 30
ENV ANDROID_BUILD_TOOLS 30.0.0
ENV ANDROID_NDK 21.0.6113669
ENV ANDROID_HOME /android-sdk-linux/
ENV ANDROID_EMULATOR 6466327
ENV ANDROID_VERSION x86-29_r10

# Update the Image and Install Dependencies
RUN apk -U add libvirt-daemon qemu-img qemu-system-x86_64 \
    unzip git curl openrc python3 openjdk8 libsodium-dev yarn
RUN rc-update add libvirtd

# Download and Install Python Dependencies
RUN curl -o get-pip.py https://bootstrap.pypa.io/get-pip.py
RUN python3 get-pip.py && rm get-pip.py
RUN pip install nox coverage

# Download Android-SDK, Install Android-SDK's Dependencies and Accept Licenses
RUN curl -o android-sdk.zip \
    "https://dl.google.com/android/repository/commandlinetools-linux-${ANDROID_SDK_TOOLS}_latest.zip"
RUN unzip -d android-sdk-linux android-sdk.zip && rm android-sdk.zip
RUN yes | android-sdk-linux/tools/bin/sdkmanager --sdk_root=${ANDROID_HOME} \
    "platforms;android-${ANDROID_COMPILE_SDK}" "build-tools;${ANDROID_BUILD_TOOLS}" \
    "ndk;${ANDROID_NDK}" "platform-tools"
RUN yes | android-sdk-linux/tools/bin/sdkmanager --licenses --sdk_root=${ANDROID_HOME}

# Install Android Emulator Scripts
RUN git clone https://github.com/google/android-emulator-container-scripts.git
RUN curl -o /android-emulator-container-scripts/emulator.zip \
    "https://dl.google.com/android/repository/emulator-linux-${ANDROID_EMULATOR}.zip"
RUN curl -o /android-emulator-container-scripts/system-image.zip \
    "https://dl.google.com/android/repository/sys-img/google_apis/${ANDROID_VERSION}.zip"