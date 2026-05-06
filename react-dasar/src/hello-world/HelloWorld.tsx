export default function HelloWorld() {
    //spread syntax
    const props: object = {
        text: 'Hello World'
    }
    return (
        <>
            <HeaderHelloWorld {...props} />
            <ParagraphHelloWorld text="Belajar React" />
        </>
    )
}

function HeaderHelloWorld({ text = 'Default value' }) {
    //style 1 with object 
    return (
        <h1 style={{
            color: 'red',
            backgroundColor: 'orange'
        }}>
            {text.toUpperCase()}
        </h1>
    )
}

function ParagraphHelloWorld({ text = 'Default value' }) {
    //style 2 with object
    const style: object = {
        color: 'blue',
        backgroundColor: 'green'
    };
    return (
        <p style={style}>
            {text.toLowerCase()}
        </p>
    )
}