export default function HelloWorld() {
    return (
        <>
            <HeaderHelloWorld />
            <ParagraphHelloWorld />
        </>
    )
}

function HeaderHelloWorld() {
    const text = 'Hello World';

    //style with object 1
    return (
        <h1 style={{
            color: 'red',
            backgroundColor: 'orange'
        }}>
            {text.toUpperCase()}
        </h1>
    )
}

function ParagraphHelloWorld() {
    const text = 'Belajar React Dasar';

    //style with object 2
    const style = {
        color: 'blue',
        backgroundColor: 'green'
    };
    return (
        <p style={style}>
            {text.toLowerCase()}
        </p>
    )
}