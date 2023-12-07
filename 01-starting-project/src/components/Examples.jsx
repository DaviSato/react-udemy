import { useState } from 'react';
import { EXAMPLES } from '../data.js';
import Section from './Section.jsx';
import TabButton from '../components/TabButton.jsx';
import Tabs from './Tabs.jsx';

export default function Examples() {

    function TabContent({ title, description, code }) {
        return <div id='tab-content'>
            <h3>{title}</h3>
            <p>{description}</p>
            <pre>
                <code>{code}</code>
            </pre>
        </div>
    }

    const [selectedTopic, setSelectedTopic] = useState()

    function handleClick(selectedButton) {
        setSelectedTopic(selectedButton)
    }

    let tabContent = <p>Please select a topic.</p>

    if (selectedTopic) {

        tabContent = TabContent(EXAMPLES[selectedTopic])
    }

    return <Section title='Examples' id='examples'>
        <Tabs buttons={<>
                <TabButton isSelected={selectedTopic === 'components'} onClick={() => handleClick('components')}>Components</TabButton>
                <TabButton isSelected={selectedTopic === 'jsx'} onClick={() => handleClick('jsx')}>JSX</TabButton>
                <TabButton isSelected={selectedTopic === 'props'} onClick={() => handleClick('props')}>Props</TabButton>
                <TabButton isSelected={selectedTopic === 'state'} onClick={() => handleClick('state')}>State</TabButton>
            </>} children={tabContent}></Tabs>
    </Section>
}