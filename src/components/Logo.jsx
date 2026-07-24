// <!-- ========================================= -->
// <!----------Logo.jsx — PreviTempo---------->
// <!-- ========================================= -->
// <!----------Autor: Erick Silva | Elarssen Code Solutions------->
// <!-- ========================================= -->
// <!-------------------Versão: 1.0----------------->
// <!-- ========================================= -->

import { useState } from 'react'
import { LuCloudSun } from 'react-icons/lu'

// Espaço reservado para a marca.

function Logo() {
    const [failed, setFailed] = useState(false)

    if (failed) {
        return <Logo className="brand__icon" aria-hidden="true" />
    }

    return (
        <img
            src="/ericksilva-logo.png"
            alt="Logo"
            className="brand__logo"
            onError={() => setFailed(true)}
        />
    )
}

export default Logo