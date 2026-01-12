function Soru(soruText, cevapSecenekleri, dogruCevap){
    this.soruText = soruText;
    this.cevapSecenekleri = cevapSecenekleri;
    this.dogruCevap = dogruCevap;
}

Soru.prototype.cevabiKontrolEt = function(cevap){
    
    return cevap === this.dogruCevap;
}