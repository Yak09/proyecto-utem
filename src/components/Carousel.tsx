import Carousel from 'react-material-ui-carousel'
import Item from './Item.tsx'


function Example(props)
{
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

    return (
    <div style={{ height: '300px' }}> {/* Establece la altura directamente en línea */}
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    </div>
    )
}

export default Example