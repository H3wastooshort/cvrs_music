//doing this as js instead of plain json makes debugging locally easier

/* formats i suggest
sd -> opus 192kbps
hd -> flac
*/

var crazy_albums = [
	{
		'album_artist': 'cvrsed',
		'album_name': ' yokubari​-​cats!',
		'album_url': 'https://cvrsed.bandcamp.com/album/yokubari-cats',
		'album_cover': 'https://files.catbox.moe/q02syv.jpg',
		'album_tracks': [
			{
				'track_name': 'nevafeltthisway',
				'track_sd': 'https://files.catbox.moe/v8bsj1.m4a',
				'track_hd': 'https://files.catbox.moe/xioeb3.flac'
			},
			{
				'track_name': 'thxuevryday',
				'track_sd': 'https://files.catbox.moe/h6407j.m4a',
				'track_hd': 'https://files.catbox.moe/38baed.flac'
			},
			{
				'track_name': 'luv2shy',
				'track_sd': 'https://files.catbox.moe/mf2nc1.m4a',
				'track_hd': 'https://files.catbox.moe/0qbzir.flac'
			}
		]
	},
	{
		'album_artist': 'cvrsed',
		'album_name': 'possibilities limitless',
		'album_url': 'https://cvrsed.bandcamp.com/album/possibilities-limitless',
		'album_cover': 'https://files.catbox.moe/kbguan.jpg',
		'album_tracks': [
			{
				'track_name': '3LGY3M',
				'track_sd': 'https://files.catbox.moe/68jn90.opus',
				'track_hd': 'https://files.catbox.moe/9um7ql.flac'
			},
			{
				'track_name': 'P1NK',
				'track_sd': 'https://files.catbox.moe/acoc9b.opus',
				'track_hd': 'https://files.catbox.moe/s6jt8v.flac'
			},
			{
				'track_name': 'W1LD',
				'track_artist': 'lovulovuelovue + cvrsed',
				'track_sd': 'https://files.catbox.moe/8c7a5z.opus',
				'track_hd': 'https://files.catbox.moe/agkit4.flac'
			},
			{
				'track_name': '1ST_TRY',
				'track_sd': 'https://files.catbox.moe/98v5sl.opus',
				'track_hd': 'https://files.catbox.moe/6gpxw3.flac'
			},
			{
				'track_name': 'CRYSIS',
				'track_sd': 'https://files.catbox.moe/o0ob6f.opus',
				'track_hd': 'https://files.catbox.moe/ttzyln.flac'
			},
			{
				'track_name': '1NF1N1TY',
				'track_sd': 'https://files.catbox.moe/dmsgf3.opus',
				'track_hd': 'https://files.catbox.moe/r3p79v.flac'
			},
			{
				'track_name': 'XOXOXO',
				'track_artist': 'cvrsed + alongthewalls',
				'track_sd': 'https://files.catbox.moe/7hjt6y.opus',
				'track_hd': 'https://files.catbox.moe/7sxs02.flac'
			},
			{
				'track_name': 'deepweb',
				'track_url': 'https://cvrsed.bandcamp.com/track/deepweb',
				'track_sd': 'https://files.catbox.moe/cy47ba.opus',
				'track_hd': 'https://files.catbox.moe/4mxcjw.flac'
			}
		]
	},
	{
		'album_artist': 'cvrsed',
		'album_name': 'oxymoronic.txtfiles',
		'album_cover': 'https://files.catbox.moe/98oz6l.jpg',
		'album_url': 'https://cvrsed.bandcamp.com/album/oxymoronic-txtfiles',
		'album_tracks': [
			{
				'track_name': '0V3RDR1V3',
				'track_sd': 'https://files.catbox.moe/lbogde.opus',
				'track_hd': 'https://files.catbox.moe/jy102m.flac'
			},
			{
				'track_name': 'C10UD99',
				'track_sd': 'https://files.catbox.moe/i8qj9b.opus',
				'track_hd': 'https://files.catbox.moe/p0fppt.flac'
			},
			{
				'track_name': 'G3TT1NGB3TTR',
				'track_sd': 'https://files.catbox.moe/1e6ra7.opus',
				'track_hd': 'https://files.catbox.moe/o3glqi.flac'
			},
			{
				'track_name': 'S7R337',
				'track_sd': 'https://files.catbox.moe/6j3gvq.opus',
				'track_hd': 'https://files.catbox.moe/dcghzs.flac'
			},
			{
				'track_name': 'P3R0X1D3',
				'track_sd': 'https://files.catbox.moe/tb9gwg.opus',
				'track_hd': 'https://files.catbox.moe/okkvsb.flac'
			},
			{
				'track_name': 'L3AN4REAL2',
				'track_sd': 'https://files.catbox.moe/kkbejo.opus',
				'track_hd': 'https://files.catbox.moe/1a6vgo.flac'
			},
			{
				'track_name': 'TYBG',
				'track_sd': 'https://files.catbox.moe/tb9gwg.opus',
				'track_hd': 'https://files.catbox.moe/09ddt7.flac'
			}
		]
	},
	{
		'album_artist': 'cvrsed',
		'album_name': 'stuff without an album',
		'album_cover': 'https://files.catbox.moe/fidjk2.png',
		'album_url': 'https://soundcloud.com/cvrsed1/popular-tracks',
		'album_tracks': [
			{
				'track_name': 'i made this to not do my compsci work',
				'track_sd': 'https://files.catbox.moe/jzy7uu.opus',
				'track_hd': 'https://files.catbox.moe/9g9wak.flac',
				'track_url': 'https://cvrsed.bandcamp.com/track/i-made-this-to-not-do-my-compsci-work'
			},
			{
				'track_name': 'i <3 dreaming',
				'track_sd': 'https://files.catbox.moe/qlqpdl.opus',
				'track_hd': 'https://files.catbox.moe/kt333x.flac',
				'track_url': 'https://soundcloud.com/cvrsed1/i-3-dreaming'
			},
			{
				'track_name': '１９９１（ ブートレッグ）',
				'track_sd': 'https://files.catbox.moe/0xkpay.opus',
				'track_hd': 'https://files.catbox.moe/tdpn2b.flac',
				'track_url': 'https://cvrsed.bandcamp.com/track/-'
			},
			{
				'track_name': 'N1NJ4_73_64N9',
				'track_sd': 'https://files.catbox.moe/vbuw7p.opus',
				'track_hd': 'https://files.catbox.moe/r4hgg3.flac',
				'track_url': 'https://cvrsed.bandcamp.com/track/n1nj4-73-64n9'
			},
			{
				'track_name': 'P74D4_',
				'track_sd': 'https://files.catbox.moe/na1r9n.opus',
				'track_hd': 'https://files.catbox.moe/6dc2u3.flac',
				'track_url': 'https://cvrsed.bandcamp.com/track/p74d4'
			},
			{
				'track_name': 'funee kitee gif (cvrsed bootleg)',
				'track_sd': 'https://files.catbox.moe/xlqqm5.opus',
				'track_hd': 'https://files.catbox.moe/lg9w6e.flac',
				'track_url': 'https://cvrsed.bandcamp.com/track/funee-kitee-gif-cvrsed-bootleg'
			},
			{
				'track_name': 'ストリートファイターIIIブートレグ',
				'track_sd': 'https://files.catbox.moe/4z1omm.opus',
				'track_hd': 'https://files.catbox.moe/8sh1fc.flac',
				'track_url': 'https://cvrsed.bandcamp.com/track/iii'
			},
			{
				'track_name': 'PON_X3 (CVRSED BOOTLEG)',
				'track_sd': 'https://files.catbox.moe/mr1g99.opus',
				'track_hd': 'https://files.catbox.moe/h3vfx9.flac',
				'track_url': 'https://cvrsed.bandcamp.com/track/pon-x3-cvrsed-bootleg'
			},
			{
				'track_name': 'WHEN THE ##RAVEMAIL',
				'track_sd': 'https://files.catbox.moe/emoud3.mp3',
				'track_artist': 'cvrsed@ravemail',
				'track_url': 'https://soundcloud.com/ravemail/cvrsed-when-the-ravemail'
			}
		]
	}
]