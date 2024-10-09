# first Start

.gitignore sistemine bi bak knk, node_modules ilerde sorun yaratabilri ve ogren o olayi<br/><br/>

**ekrem knk** backend de frontendde ki api url ile logout eklenicek

# second

sifre sisteminde **hash/decode olucak**

# third

admin/user olayini arastirmamiz lazim. anam babam usulu user mi olucak yoksa admin diye ozel bir kullanim mi ?<br/>
admin de bi user cunku. ve bu user ile giris yaptiginda admin yetkileri var zaten<br/>

```
// Eğer master giriş yapıyorsa, .env'deki bilgileri kontrol et
if (username === config.masterUsername && password === config.masterPassword) {
  const masterToken = authService.generateToken({ username, role: 'master' });
  res.status(200).json({ token: masterToken });
  return;
}
```

millet boyle bisey kullanmis ozel bir `admin` kullanimi olucak belli ki<br/>

# fourth

**db ve server olmak uzere 2ye ayrilicak index.ts config/ dosyasi olucak, best practise file structure olucak**

<br/><br/>

# fifth

jwt, cookie, token sistemi olucak/eklenicek ve consoledan bunu bastiricak<br/>

### ve enson:

sil islemiyle butun package siliyo, sadece soru silme eklenicek<br/>