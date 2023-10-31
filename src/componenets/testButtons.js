import React from "react"

export default function TestButtons() {

    function createMusic (song, artist, rating) {
        return;
    }

    return (
        <div>
            <button onClick={createMusic}>
                create
            </button>
            <button>
                read
            </button>
            <button>
                update
            </button>
            <button>
                delete
            </button>
            <button>
                signup
            </button>
            <button>
                login
            </button>
        </div>
    )
}