// ----=  HANDS  =----
/* load images here */

function prepareInteraction() {
head = loadImage('/images/PuppetHead.png');
torso = loadImage('/images/PuppetTorso.png');
armR = loadImage('/images/PuppetArmR.png');
armL = loadImage('/images/PuppetArmL.png');
}


function drawInteraction(faces, hands) {
  // hands part
  // for loop to capture if there is more than one hand on the screen. This applies the same process to all hands.
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    //console.log(hand);
    if (showKeypoints) {
      drawConnections(hand)
    }


angleMode(DEGREES);
// Key finger points
let tip = hand.middle_finger_tip;//based mainly around the middle finger
let pip = hand.middle_finger_pip;//used the 'hand.' variables for this as they were easy to copy/paste
let wrist = hand.wrist;//to reference for scale 

let dx = pip.x - tip.x; //.x reads the x value of the pip/tip (of the middle finger)
let dy = pip.y - tip.y; //.y reads the y
let angle = atan2(dy, dx); //atan2- calculates angle formed by the different hand points.


//scaling based on where the hand is/ distance
let handLength = dist(wrist.x, wrist.y, tip.x, tip.y); //sets handlength depending on the distance between wrist and middle finger
let scaleFactor = map(handLength, 80, 300, 0.01, 0.25, true); //scales the size depending on how far away the hand is- observed by handlength


//tips of fingers next to middle- for arm control
let indexTip = hand.index_finger_tip;
let ringTip = hand.ring_finger_tip;


//offsets the arms from the central torso- allows it to also scale with the distance. 
let shoulderOffsetX = torso.width * scaleFactor * 0.7; 
let shoulderOffsetY = torso.height * scaleFactor * -0.3; 




//torso
push();
  imageMode(CENTER); //so the image doesnt draw from the corner 
  translate(pip.x, pip.y); //draws middle of finger
  rotate(angle-90); //the angle was offset, this rectifys it
  image(torso, 0, -10, torso.width * scaleFactor, torso.height * scaleFactor); // draws the image- allows it to be scaled
pop();



//head - works much the same as the torso- except drawn on the fingertip 
push();
  imageMode(CENTER);
  translate(tip.x, tip.y);
  rotate(angle-90);
  image(head, 0, -head.height * scaleFactor * 0.4, head.width * scaleFactor, head.height * scaleFactor);
pop();
 



//right arm
push();
  imageMode(CENTER); //draws central 
  translate(pip.x + shoulderOffsetX, pip.y + shoulderOffsetY); //translates the centre point as between the fingertip and the torso- offset 
    let angleR = atan2(indexTip.y - (pip.y + shoulderOffsetY), indexTip.x - (pip.x + shoulderOffsetX));//lets the angle follow the fingertips 
  rotate(angleR);//activates the rotation to follwo the fingertips 
  image(armR, 0, 0, armR.width * scaleFactor, armR.height * scaleFactor); //draws the arm with relation to everything getting smaller with distance 
pop();

//left arm - works much the same as the right arm except some values are swapped/replaced with the left counterparts. 
push();
  imageMode(CENTER);
  translate(pip.x - shoulderOffsetX, pip.y + shoulderOffsetY); // left shoulder
    let angleL = atan2(ringTip.y - (pip.y + shoulderOffsetY), ringTip.x - (pip.x - shoulderOffsetX));
  rotate(angleL);
  image(armL, 0, 0, armL.width * scaleFactor, armL.height * scaleFactor);
pop();



/*
Stop drawing on the hands here
*/
}
  // You can make addtional elements here, but keep the hand drawing inside the for loop. 
  //------------------------------------------------------
}




