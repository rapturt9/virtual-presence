String mystr = "0";

void setup()
{
Serial.begin(9600);           // start serial for output
pinMode(4, OUTPUT); 
pinMode(5, OUTPUT); 
pinMode(6, OUTPUT);
pinMode(7, OUTPUT);
pinMode(8, OUTPUT); 
pinMode(9, OUTPUT); 
pinMode(10, OUTPUT);
pinMode(11, OUTPUT);

}



// function that executes whenever data is received from master
// this function is registered as an event, see setup()
void loop() 
{
  mystr=Serial.readString();
  int inInt = mystr.toInt();    // receive byte as an integer
  if(inInt!=0){
      Serial.print("got:");
      Serial.println(inInt);
  }
  if(inInt == 1){
      digitalWrite(4,HIGH);
  digitalWrite(5,LOW);

  digitalWrite(6,LOW);
  digitalWrite(7,HIGH);

  digitalWrite(8,HIGH);
  digitalWrite(9,LOW);

  digitalWrite(10,LOW);
  digitalWrite(11,HIGH);
    }
    if(inInt == 2){
      digitalWrite(4,LOW);
  digitalWrite(5,HIGH);

  digitalWrite(6,HIGH);
  digitalWrite(7,LOW);

  digitalWrite(8,LOW);
  digitalWrite(9,HIGH);

  digitalWrite(10,HIGH);
  digitalWrite(11,LOW);
    }
    if(inInt == 3){
      digitalWrite(4,LOW);
  digitalWrite(5,LOW);

  digitalWrite(6,LOW);
  digitalWrite(7,LOW);

  digitalWrite(8,LOW);
  digitalWrite(9,LOW);

  digitalWrite(10,LOW);
  digitalWrite(11,LOW);
    }
    if(inInt == 4){
      digitalWrite(4,HIGH);
  digitalWrite(5,LOW);
  digitalWrite(6,LOW);
  digitalWrite(7,LOW);
digitalWrite(8,LOW);
  digitalWrite(9,LOW);
digitalWrite(10,LOW);
  digitalWrite(11,HIGH);

    }
    if(inInt == 5){
digitalWrite(4,LOW);
  digitalWrite(5,LOW);
  digitalWrite(6,LOW);
  digitalWrite(7,HIGH);
digitalWrite(8,HIGH);
  digitalWrite(9,LOW);
digitalWrite(10,LOW);
  digitalWrite(11,LOW);
    }
}
