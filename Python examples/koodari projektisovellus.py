class Projetki:
    id = 1
    def __init__(self, kuvaus: str, koodari: str, tyomaara: int):
        self.kuvaus = kuvaus
        self.koodari = koodari
        self.tyomaara = tyomaara
        self.valmis = False
        self.id = str(Projetki.id)
        Projetki.id += 1

    def merkkaa_valmiiksi(self):
        self.valmis = True

class Sovellus:
    def __init__(self):
        self.tilaukset =[]
    
    def lisaa_tilaus(self, kuvaus: str, koodari_tunnit: str):
        info = koodari_tunnit.split()
        if len(info) > 1 and info[1].isnumeric():
            self.tilaukset.append(Projetki(kuvaus, info[0], int(info[1])))
            return True
        elif len(info) < 2 or info[1].isalpha():
            return False
        
    def valmiit_tilaukset(self):
        return [tilaus for tilaus in self.tilaukset if tilaus.valmis == True]
    
    def ei_valmiit_tilaukset(self):
        return [tilaus for tilaus in self.tilaukset if tilaus.valmis == False]
    
    def merkkaa_valmiiksi(self, id: str):
        tilaukset = [tilaus.id for tilaus in self.tilaukset]
        if not id in tilaukset:
            return False
        else:
            for tilaus in self.tilaukset:
                if id == tilaus.id:
                    tilaus.merkkaa_valmiiksi()
    
    def koodarit(self):
        return list(set([projekti.koodari for projekti in self.tilaukset]))

    def koodarin_status(self, koodari: str):
        valmiit = []
        ei_valmiit = []
        valmiit_tunnit = []
        ei_valmiit_tunnit = []
        koodarit = [devaaja.koodari for devaaja in self.tilaukset]
        if not koodari in koodarit:
            return False
        for devaaja in self.tilaukset:
            if koodari == devaaja.koodari:
                if devaaja.valmis == True:
                    valmiit.append(devaaja)
                    valmiit_tunnit.append(devaaja.tyomaara)
                elif devaaja.valmis == False:
                    ei_valmiit.append(devaaja)
                    ei_valmiit_tunnit.append(devaaja.tyomaara)
        
        return f" työt: valmiina {len(valmiit)} ei valmiina {len(ei_valmiit)}, tunteja: tehty {sum(valmiit_tunnit)} tekemättä {sum(ei_valmiit_tunnit)}"

    def help(self):

        print("komennot:")
        print("0 lopetus")
        print("1 lisää tilaus")
        print("2 listaa valmiit")
        print("3 listaa ei valmiit")
        print("4 merkitse tehtävä valmiiksi")
        print("5 koodarit")
        print("6 koodarin status")
        print("")
    
    def sovellus(self):
        self.help()
        while True:
            select = int(input("komento:"))
            if select == 0:
                break
            elif select == 1:
                kuvaus = input("kuvaus:")
                koodari_ja_tunnit = input("koodari ja työmääräarvio:")
                tiedot =  self.lisaa_tilaus(kuvaus, koodari_ja_tunnit)
                if tiedot == True:
                    print("lisätty!")
                    print("")
                elif tiedot == False:
                    print("virheellinen syöte")
            
            elif select == 2:
                valmiit = self.valmiit_tilaukset()
                if len(valmiit) < 1:
                    print("ei valmiita")
                else:
                    for projekti in valmiit:
                        print(f"{projekti.id}: {projekti.kuvaus} ({projekti.tyomaara} tuntia), koodari {projekti.koodari} VALMIS")
            
            elif select == 3:
                ei_valmiit = self.ei_valmiit_tilaukset()
                for projekti in ei_valmiit:
                    print(f"{projekti.id}: {projekti.kuvaus} ({projekti.tyomaara} tuntia), koodari {projekti.koodari} EI VALMIS")
            
            elif select == 4:
                tunniste = input("tunniste:")
                tiedot = self.merkkaa_valmiiksi(tunniste)
                if tiedot == False:
                    print("virheellinen syöte")   
                else:
                    print("merkitty valmiiksi")
            
            elif select == 5:
                koodarit = self.koodarit()
                for koodari in koodarit:
                    print(koodari)

            elif select == 6:
                devaaja = input("koodari:")
                tiedot = (self.koodarin_status(devaaja))
                if tiedot == False:
                     print("virheellinen syöte")
                else:
                    print(self.koodarin_status(devaaja))


ps = Sovellus()
ps.sovellus()
