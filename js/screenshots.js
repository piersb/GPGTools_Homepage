function gpgmailScreenshots() {
/*
    Lightview.show([
        {
            'title': 'Screenshot 1',
            'url': '../images/screenshots/gpgmail/GPGS1.png',
        },
        {
            'title': 'Screenshot 2',
            'url': '../images/screenshots/gpgmail/GPGS2.png'
        },
        {
            'title': 'Screenshot 3',
            'url': '../images/screenshots/gpgmail/GPGS3.png'
        },
        {
            'title': 'Screenshot 4',
            'url': '../images/screenshots/gpgmail/GPGS4.png'
        },
        {
            'title': 'Screenshot 5',
            'url': '../images/screenshots/gpgmail/GPGS5.png'
        },
        {
            'title': 'Screenshot 1',
            'url': '../images/screenshots/gpgmail/GPGS1.png',
        },
        {
            'title': 'Screenshot 2',
            'url': '../images/screenshots/gpgmail/GPGS2.png'
        },
        {
            'title': 'Screenshot 3',
            'url': '../images/screenshots/gpgmail/GPGS3.png'
        },
        {
            'title': 'Screenshot 4',
            'url': '../images/screenshots/gpgmail/GPGS4.png'
        },
        {
            'title': 'Screenshot 5',
            'url': '../images/screenshots/gpgmail/GPGS5.png'
        }
    ], {controls: 'thumbnails'})
*/	
    Lightview.show({url: './sites/gpgmail-screenshots.html', type: 'ajax'}, {controls: {'close': false},
        skin: 'gpgtools', 'viewport': 'scale'})
}