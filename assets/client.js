$(document).ready(async () => {
    if (/*@cc_on!@*/false) {
        alert('IE is not fully supported. It is HIGHLY recommended you upgrade to a newer browser, for security reasons.');
    } else
        (() => {

            const themeNow = localStorage.getItem("theme");
            if (themeNow == "dark") {
                document.body.classList.toggle("dark");
                return;
            } else if (themeNow == "light") {
                document.body.classList.toggle("light");
                return;
            }
            var bodyClasses = document.body.classList;

            if (!bodyClasses.contains('light') && !bodyClasses.contains('dark')) {
                if (window.matchMedia("(prefers-color-scheme: light)"))
                    bodyClasses.add("light")
                else
                    bodyClasses.add("dark")
            }
        })()
    const btn = $("#theme");
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    btn.on("click", () => {
        if (prefersDarkScheme.matches) {
            document.body.classList.toggle("light");
            var theme = document.body.classList.contains("light") ? "light" : "dark";
        } else {
            document.body.classList.toggle("dark");
            var theme = document.body.classList.contains("dark") ? "dark" : "light";
        }
        localStorage.setItem("theme", theme);
        window.location = window.location
    });
    function getArr(nameJson, name, gender) {
        if (name.length = 0) {
            return alert('You must enter a name!')
        }

        let map = new Map();

        for (var i = name.length; i > 0; i--) {
            map.set(name.toLowerCase().substring(0, i), nameJson[gender].filter(el => el.toLowerCase().substring(0, i) == name.toLowerCase().substring(0, i)))
        }
        map.forEach((v, k) => {
            if (v.length === 0) {
                map.delete(k)
            }
        })

        arrayNames = Array.from(map, ([name, value]) => (value))
        let concatArray = []
        arrayNames.forEach((el) => {
            el.forEach((subEl) => {
                concatArray.push(subEl)
            })
        })
        concatArray = [...new Set(concatArray)];
        return concatArray;
        // will return an array without duplicates, sorted by similarity to original name
    }
    var fetchTMP = await fetch(`${window.location.origin}/assets/namelist.json`)
    var namelist = await fetchTMP.json()
    var updateFunc = () => {

        $('#list').empty()
        nameArray = getArr(namelist, $('#nameSearch').val(), $('#genderDropdown').val())
        nameArray.forEach((el, i) => {
            $('#list').append('<li>' + el + '</li>')
            setTimeout(function() {
                $('li').css('opacity',1)
              }, 10);
        })
    }
    $('#nameSearch').on('keydown paste', updateFunc)
    $('#genderDropdown').on('input', updateFunc)

}
);