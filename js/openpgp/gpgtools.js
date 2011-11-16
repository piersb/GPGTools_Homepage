            var keytype = 1;
            var pubkey  = "CACUaeg1vjWpg+H8ZmdeJYOiyrasNfJ8mY+TIVkcU/zvMc0cKMeluuxii99JWOEoqmWZUWMIfZmLTckfSMfTMO96fKGaqtKQwh1yDwtRI4G58ZTBGLV9Qp1AsJ/yM4WrZP29Tjzog70PwgqSnPb1iaTzcquMPdh47948IGFdfnvpAPx2K0VIqU1Ce25ZzaBsX6aflmya/TuRHjgZMixzD/LBhABiUHge3FjCkBmRtNF7GwO1u31vzUFSQHxrOQALYwwkTpwHCC3loXvmIZGKWsVlCVg00SUBCT4m7tA4q4VEMIW4o0npy6JkkI8Otg9Jr6gvyC8YXI8+Z3a3Obz3cElXAAURCACFg80OeVhuExuOvO/b/AYgvAjMipUkrona1wA1ibyUocVWOxIoEmKBiwwStdF2C03oxRQ2qjdAZOYvO42oK9w/LVY9Zb4kIr4vM4xeeKmNe1YvDDXn7JVjBDEhgDBp9CnfwKeow5zmrAemdgewtWkDuW7/igD4KHbqhQgK90fS4ZKeXr6ETJzT23bgTIdLv4qKOE10stUKl4M3h91dkV6bGnEqcNyLzzy4pFZDf5dqr+UrjvZVi9gnItYotaHCEYrF4nAjtzNK1uKS2ja6gmEOp7D/OJLbZ6XG8SnpbnVD1llX4SXGOaKDb6z0OwilH7wEM40fxcpYH1A9+ICfsLKC";
            var keyid   = "07eae49adbcbe671";

            /*
            var keyfile = document.getElementById("pgpkey").href;
            var keyfile = "http://www.gpgtools.org/files/gpgtools.asc";
            //issue: Origin null is not allowed by Access-Control-Allow-Origin.
            //issue: Cross origin requests are only supported for HTTP
            var key     = ReadFile(keyfile);
            var keydata = OpenPGP_GetPublicInformation(key);
            var pubkey  = keydata['mpi'];
            var keyid   = keydata['id'];
            */

            function encrypt() {
                if (document.getElementById("confidential").checked == true) {
                    var text = document.feedback.message.value;
                    var text_enc = OpenPGP_Encrypt(keyid, keytype, pubkey, text);
                    document.feedback.message.value = '';
                    document.feedback.encrypted.value = text_enc;
                }
                return true;
            }

            function toggleSecurity() {
                if (document.getElementById("confidential").checked == true) {
                    document.getElementById("feedbackbutton") ? document.getElementById("feedbackbutton").value="encrypt and send" : null;
                } else {
                    document.getElementById("feedbackbutton") ? document.getElementById("feedbackbutton").value="send feedback" : null;
                }
            }
