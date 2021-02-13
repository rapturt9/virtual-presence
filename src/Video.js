import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { options, rtc } from "./secrets";
import AgoraRTC from "agora-rtc-sdk-ng";

let mount=false;

const Video = props => {
    console.log(window.innerWidth*(1-props.type*.2));
    useEffect(() => {
        if(!mount){ 
            mount=true;
            handleSubmit();
        }
      });

  async function handleSubmit() {
    try {

      setJoined(true);

      rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
      const uid = await rtc.client.join(
        options.appId,
        "robot",
        options.token,
        null
      );

      // Create an audio track from the audio captured by a microphone
      rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      // Create a video track from the video captured by a camera
      rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

      if(rtc.client.remoteUsers[0]){
          const user = rtc.client.remoteUsers[0];
        await rtc.client.subscribe(user, "video");
        console.log("subscribe success");

            const remoteVideoTrack = user.videoTrack;
            console.log(remoteVideoTrack);
  
            // Dynamically create a container in the form of a DIV element for playing the remote video track.
            const PlayerContainer = React.createElement("div", {
              id: user.uid,
              className: `${props.type===0?"stream2":"stream"}`,
            });
            ReactDOM.render(
              PlayerContainer,
              document.getElementById("remote-stream")
            );
  
            await rtc.client.subscribe(user, "audio");
            user.videoTrack.play(`${user.uid}`);
          
  
            // Get `RemoteAudioTrack` in the `user` object.
            const remoteAudioTrack = user.audioTrack;
            // Play the audio track. Do not need to pass any DOM element
            remoteAudioTrack.play();
          
      }
      rtc.client.on("user-published", async (user, mediaType) => {
        // Subscribe to a remote user
        await rtc.client.subscribe(user, mediaType);
        console.log("subscribe success");
        // console.log(user);

        if (mediaType === "video" || mediaType === "all") {
          // Get `RemoteVideoTrack` in the `user` object.
          const remoteVideoTrack = user.videoTrack;
          console.log(remoteVideoTrack);

          // Dynamically create a container in the form of a DIV element for playing the remote video track.
          const PlayerContainer = React.createElement("div", {
            id: user.uid,
            className: `${props.type===0?"stream2":"stream"}`,
          });
          ReactDOM.render(
            PlayerContainer,
            document.getElementById("remote-stream")
          );

          user.videoTrack.play(`${user.uid}`);
        }

        if (mediaType === "audio" || mediaType === "all") {
          // Get `RemoteAudioTrack` in the `user` object.
          const remoteAudioTrack = user.audioTrack;
          // Play the audio track. Do not need to pass any DOM element
          remoteAudioTrack.play();
        }
      });

      rtc.client.on("user-unpublished", (user) => {
        // Get the dynamically created DIV container
        const playerContainer = document.getElementById(user.uid);
        console.log(playerContainer);
        // Destroy the container
        playerContainer.remove();
      });

      // Publish the local audio and video tracks to the channel
      await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

      console.log("publish success!");
    } catch (error) {
      console.error(error);
    }
  }

  const [joined, setJoined] = useState(false);
  const channelRef = useRef("");
  const remoteRef = useRef("");
  const leaveRef = useRef("");

  return (
    <>
      {joined ? (
        <>
          <div
            id="remote-stream"
            ref={remoteRef}
            className={`remote-stream ${props.type===0?"stream2":"stream"}`}
          ></div>
        </>
      ) : null}
    </>
  );
}

export default Video;