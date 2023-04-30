import { parseGameLog } from "./gameLog";

test("parse gamelog", () => {
  const box = parseGameLog(
    '"20170817","1","Thu","CLE","AL",118,"MIN","AL",118,9,3,54,"D","","","","MIN04",29579,233,"210000042","010000110",39,14,1,0,2,9,0,0,4,3,0,5,0,1,2,0,10,6,3,3,0,0,27,8,0,0,0,0,35,10,2,1,1,3,0,0,0,3,0,19,0,0,0,0,8,6,9,9,1,0,27,13,1,0,2,0,"vanol901","Larry Vanover","may-b901","Ben May","rackd901","David Rackley","marqa901","Alfonso Marquez","","(none)","","(none)","frant001","Terry Francona","molip001","Paul Molitor","carrc003","Carlos Carrasco","gibsk002","Kyle Gibson","","(none)","brucj001","Jay Bruce","carrc003","Carlos Carrasco","gibsk002","Kyle Gibson","lindf001","Francisco Lindor",6,"kipnj001","Jason Kipnis",4,"ramij003","Jose Ramirez",5,"encae001","Edwin Encarnacion",10,"brucj001","Jay Bruce",9,"santc002","Carlos Santana",3,"guyeb001","Brandon Guyer",7,"zimmb001","Bradley Zimmer",8,"gomey001","Yan Gomes",2,"dozib001","Brian Dozier",4,"keplm001","Max Kepler",9,"mauej001","Joe Mauer",3,"sanom001","Miguel Sano",5,"rosae001","Eddie Rosario",7,"escoe001","Eduardo Escobar",10,"buxtb001","Byron Buxton",8,"polaj001","Jorge Polanco",6,"castj006","Jason Castro",2,"","Y"'
  );
  console.log(JSON.stringify(box));
});
